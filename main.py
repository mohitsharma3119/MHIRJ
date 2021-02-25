# Importing libraries to the project
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
import numbers
import datetime
import time
import sys
import csv
import json

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
templates = Jinja2Templates(directory="templates")


app = FastAPI()

#Datatobeanalyzed_path = r"C:\Users\User\MDCRawDataSKW2.csv"
Datatobeanalyzed_path = "./MdcRawDataTest_5000.csv"
MDCMessagesURL_path = r"C:\Users\User\MDCMessagesInputs.csv"
TopMessagesURL_path = r"C:\Users\User\TopMessagesSheet.csv"

Flagsreport = 1  # this is here to initialize the variable. user must start report by choosing Newreport = True
OutputTableHistory = pd.DataFrame()
MDCeqns_arrayforgraphing = pd.DataFrame()

# Reading CSV file
MDCdataDF = pd.read_csv(Datatobeanalyzed_path, encoding="utf8")

# Date formatting
MDCdataDF["DateAndTime"] = pd.to_datetime(MDCdataDF["DateAndTime"])
# print(MDCdataDF["DateAndTime"])
MDCdataDF["Flight Leg No"].fillna(value=0.0, inplace=True)  # Null values preprocessing - if 0 = Currentflightphase
# print(MDCdataDF["Flight Leg No"])
MDCdataDF["Flight Phase"].fillna(False, inplace=True)  # NuCell values preprocessing for currentflightphase
MDCdataDF["Intermittent"].fillna(value=-1, inplace=True)  # Null values preprocessing for currentflightphase
MDCdataDF["Intermittent"].replace(to_replace=">", value="9",
                                  inplace=True)  # > represents greater than 8 Intermittent values
MDCdataDF["Aircraft"] = MDCdataDF["Aircraft"].str.replace('AC', '')
MDCdataDF.fillna(value=" ", inplace=True)  # replacing all REMAINING null values to a blank string

DatesinData = MDCdataDF["DateAndTime"].dt.date.unique()  # these are the dates in the data in Datetime format.
NumberofDays = len(MDCdataDF["DateAndTime"].dt.date.unique())  # to pass into Daily analysis number of days in data
latestDay = str(MDCdataDF.loc[0, "DateAndTime"].date())  # to pass into Daily analysis
LastLeg = max(MDCdataDF["Flight Leg No"])  # Latest Leg in the data
MDCdataArray = MDCdataDF.to_numpy()  # converting to numpy to work with arrays

MDCMessagesDF = pd.read_csv(MDCMessagesURL_path, encoding="utf8")  # bring messages and inputs into a Dataframe
MDCMessagesArray = MDCMessagesDF.to_numpy()  # converting to numpy to work with arrays
ShapeMDCMessagesArray = MDCMessagesArray.shape  # tuple of the shape of the MDC message data (#rows, #columns)
TopMessagesDF = pd.read_csv(TopMessagesURL_path)  # bring messages and inputs into a Dataframe
TopMessagesArray = TopMessagesDF.to_numpy()  # converting to numpy to work with arrays

UniqueSerialNumArray = []

@app.post("/OutputTableDaily/{CurrentFlightPhaseEnabled}/{MaxAllowedOccurances}/{MaxAllowedConsecLegs}/{MaxAllowedIntermittent}")
async def parsedaily(CurrentFlightPhaseEnabled: int, MaxAllowedOccurances: int, MaxAllowedConsecLegs: int, MaxAllowedIntermittent: int):

    #return {"a":CurrentFlightPhaseEnabled}
    '''
    CurrentFlightPhaseEnabled = 0 # 1 or 0, 1 includes current phase, 0 does not include current phase
    MaxAllowedOccurances = 2 # flag for Total number of occurences -> T
    MaxAllowedConsecLegs = 3 # flag for consecutive legs -> CF
    MaxAllowedIntermittent = 5 # flag for intermittent values ->IM
    '''

    global UniqueSerialNumArray

    # function to separate the chunks of data and convert it into a numpy array
    def separate_data(data, date):
        '''Takes data as a dataframe, along with a date to slice the larger data to only include the data in that date'''

        DailyDataDF = data.loc[date]
        return DailyDataDF

    AnalysisDF = MDCdataDF.set_index("DateAndTime") # since dateandtime was moved to the index of the DF, the column values change from the original MDCdataDF

    currentRow = 0
    MAINtable_array_temp = np.empty((1,18),object) # 18 for the date #input from user
    MAINtable_array = []

    # will loop through each day to slice the data for each day, then initialize arrays to individually analyze each day

    for i in range(0, NumberofDays):
        daytopass = str(DatesinData[i])

        # define array to analyze
        DailyanalysisDF = separate_data(AnalysisDF, daytopass)

        ShapeDailyanalysisDF = DailyanalysisDF.shape  # tuple of the shape of the daily data (#rows, #columns)
        DailyanalysisArray = DailyanalysisDF.to_numpy()  # slicing the array to only include the daily data
        NumAC = DailyanalysisDF["Aircraft"].nunique()  # number of unique aircraft SN in the data
        UniqueSerialNumArray = DailyanalysisDF.Aircraft.unique()  # unique aircraft values
        SerialNumFreqSeries = DailyanalysisDF.Aircraft.value_counts()  # the index of this var contains the AC with the most occurrences
        MaxOfAnAC = SerialNumFreqSeries[0]  # the freq series sorts in descending order, max value is top

        # Define the arrays as numpy
        MDCeqns_array = np.empty((MaxOfAnAC, NumAC), object)  # MDC messages for each AC stored in one array
        MDCLegs_array = np.empty((MaxOfAnAC, NumAC), object)  # Flight Legs for a message for each AC stored in one array
        MDCIntermittent_array = np.empty((MaxOfAnAC, NumAC),
                                         object)  # stores the intermittence values for each message of each array
        FourDigATA_array = np.empty((MaxOfAnAC, NumAC), object)  # stores the ATAs of each message in one array

        if CurrentFlightPhaseEnabled == 1:  # Show all, current and history
            MDCFlightPhase_array = np.ones((MaxOfAnAC, NumAC), int)
        elif CurrentFlightPhaseEnabled == 0:  # Only show history
            MDCFlightPhase_array = np.empty((MaxOfAnAC, NumAC), object)

        Messages_LastRow = ShapeMDCMessagesArray[0]  # taken from the shape of the array (3519 MDC messages total)
        Flags_array = np.empty((Messages_LastRow, NumAC), object)
        FlightLegsEx = 'Flight legs above 32,600 for the following A/C: '  # at 32767 the DCU does not incrementmore the flight counter, so the MDC gets data for the same 32767 over and over until the limit of MDC logs per flight leg is reached (20 msgs per leg), when reached the MDC stops storing data since it gets always the same 32767
        TotalOccurances_array = np.empty((Messages_LastRow, NumAC), int)
        ConsecutiveLegs_array = np.empty((Messages_LastRow, NumAC), int)
        IntermittentInLeg_array = np.empty((Messages_LastRow, NumAC), int)

        # 2D array looping, columns (SNcounter) rows (MDCsheetcounter)
        for SNCounter in range(0, NumAC):  # start counter over each aircraft (columns)

            MDCArrayCounter = 0  # rows of each different array

            for MDCsheetCounter in range(0, ShapeDailyanalysisDF[0]):  # counter over each entry  (rows)

                # If The Serial number on the dailyanalysisarray matches the current Serial Number, copy
                if DailyanalysisArray[MDCsheetCounter, 0] == UniqueSerialNumArray[SNCounter]:
                    # Serial numbers match, record information
                    #       SNcounter -->
                    # format for these arrays :   | AC1 | AC2 | AC3 |.... | NumAC
                    # MDCarraycounter(vertically)| xx | xx | xx |...
                    MDCeqns_array[MDCArrayCounter, SNCounter] = DailyanalysisArray[
                        MDCsheetCounter, 13]  # since dateandtime is the index, 13 corresponds to the equations column, where in the history analysis is 14
                    MDCLegs_array[MDCArrayCounter, SNCounter] = DailyanalysisArray[MDCsheetCounter, 2]
                    MDCIntermittent_array[MDCArrayCounter, SNCounter] = DailyanalysisArray[
                        MDCsheetCounter, 12]  # same as above ^
                    FourDigATA_array[MDCArrayCounter, SNCounter] = DailyanalysisArray[MDCsheetCounter, 5]

                    if DailyanalysisArray[MDCsheetCounter, 10]:
                        FourDigATA_array[MDCArrayCounter, SNCounter] = DailyanalysisArray[MDCsheetCounter, 5]

                    if CurrentFlightPhaseEnabled == 0:  # populating the empty array
                        MDCFlightPhase_array[MDCArrayCounter, SNCounter] = DailyanalysisArray[MDCsheetCounter, 10]

                    MDCArrayCounter = MDCArrayCounter + 1

            # arrays with the same size as the MDC messages sheet (3519) checks if each message exists in each ac
            for MessagessheetCounter in range(0, Messages_LastRow):

                # Initialize Counts, etc

                # Total Occurances
                eqnCount = 0

                # Consecutive Legs
                ConsecutiveLegs = 0
                MaxConsecutiveLegs = 0
                tempLeg = LastLeg

                # Intermittent
                IntermittentFlightLegs = 0

                MDCArrayCounter = 0

                while MDCArrayCounter < MaxOfAnAC:
                    if MDCeqns_array[MDCArrayCounter, SNCounter]:
                        # Not Empty, and not current                                      B code
                        if MDCeqns_array[MDCArrayCounter, SNCounter] == MDCMessagesArray[MessagessheetCounter, 12] \
                                and MDCFlightPhase_array[MDCArrayCounter, SNCounter]:

                            # Total Occurances
                            # Count this as 1 occurance
                            eqnCount = eqnCount + 1

                            # Consecutive Days not used in the daily analysis DO FOR HISTORY

                            # Consecutive Legs
                            if MDCLegs_array[MDCArrayCounter, SNCounter] == tempLeg:

                                tempLeg = tempLeg - 1
                                ConsecutiveLegs = ConsecutiveLegs + 1

                                if ConsecutiveLegs > MaxConsecutiveLegs:
                                    MaxConsecutiveLegs = ConsecutiveLegs

                            else:

                                # If not consecutive, start over
                                ConsecutiveLegs = 1
                                tempLeg = MDCLegs_array[MDCArrayCounter, SNCounter]

                            # Intermittent
                            # Taking the maximum intermittent value - come back to this and implement max function for an column
                            x = MDCIntermittent_array[MDCArrayCounter, SNCounter]
                            if isinstance(x, numbers.Number) and MDCIntermittent_array[
                                MDCArrayCounter, SNCounter] > IntermittentFlightLegs:
                                IntermittentFlightLegs = MDCIntermittent_array[MDCArrayCounter, SNCounter]
                            # End if Intermittent numeric check

                            # Other
                            # Check that the legs is not over the given limit
                            Flags_array[MessagessheetCounter, SNCounter] = ''
                            if MDCLegs_array[MDCArrayCounter, SNCounter] > 32600:
                                FlightLegsEx = FlightLegsEx + str(UniqueSerialNumArray[SNCounter]) + ' (' + str(
                                    MDCLegs_array[MDCArrayCounter, SNCounter]) + ')' + ' '
                            # End if Legs flag

                            # Check for Other Flags
                            if MDCMessagesArray[MessagessheetCounter, 13]:
                                # Immediate (occurrance flag in excel MDC Messages sheet)
                                if MDCMessagesArray[MessagessheetCounter, 13] == 1:
                                    # Immediate Flag required
                                    Flags_array[MessagessheetCounter, SNCounter] = str(
                                        MDCMessagesArray[MessagessheetCounter, 12]) + " occured at least once."
                        MDCArrayCounter += 1

                    else:
                        MDCArrayCounter = MaxOfAnAC

                        # Next MDCArray Counter

                TotalOccurances_array[MessagessheetCounter, SNCounter] = eqnCount
                ConsecutiveLegs_array[MessagessheetCounter, SNCounter] = MaxConsecutiveLegs
                IntermittentInLeg_array[MessagessheetCounter, SNCounter] = IntermittentFlightLegs

            # Next MessagessheetCounter
        # Next SNCounter

        for SNCounter in range(0, NumAC):

            for EqnCounter in range(0, Messages_LastRow):

                # Continue with Report
                if TotalOccurances_array[EqnCounter, SNCounter] >= MaxAllowedOccurances \
                        or ConsecutiveLegs_array[EqnCounter, SNCounter] >= MaxAllowedConsecLegs \
                        or IntermittentInLeg_array[EqnCounter, SNCounter] >= MaxAllowedIntermittent \
                        or Flags_array[EqnCounter, SNCounter]:

                    # Populate Flags Array
                    if TotalOccurances_array[EqnCounter, SNCounter] >= MaxAllowedOccurances:
                        Flags_array[EqnCounter, SNCounter] = Flags_array[
                                                                 EqnCounter, SNCounter] + "Total occurances exceeded " + str(
                            MaxAllowedOccurances) + " occurances. "

                    if ConsecutiveLegs_array[EqnCounter, SNCounter] >= MaxAllowedConsecLegs:
                        Flags_array[EqnCounter, SNCounter] = Flags_array[
                                                                 EqnCounter, SNCounter] + "Maximum consecutive flight legs exceeded " + str(
                            MaxAllowedConsecLegs) + " flight legs. "

                    if IntermittentInLeg_array[EqnCounter, SNCounter] >= MaxAllowedIntermittent:
                        Flags_array[EqnCounter, SNCounter] = Flags_array[
                                                                 EqnCounter, SNCounter] + "Maximum intermittent occurances for one flight leg exceeded " + str(
                            MaxAllowedIntermittent) + " occurances. "

                    # populating the final array (Table)
                    MAINtable_array_temp[0, 0] = daytopass
                    MAINtable_array_temp[0, 1] = UniqueSerialNumArray[SNCounter]
                    MAINtable_array_temp[0, 2] = MDCMessagesArray[EqnCounter, 8]
                    MAINtable_array_temp[0, 3] = MDCMessagesArray[EqnCounter, 4]
                    MAINtable_array_temp[0, 4] = MDCMessagesArray[EqnCounter, 0]
                    MAINtable_array_temp[0, 5] = MDCMessagesArray[EqnCounter, 1]
                    MAINtable_array_temp[0, 6] = MDCMessagesArray[EqnCounter, 12]
                    MAINtable_array_temp[0, 7] = MDCMessagesArray[EqnCounter, 7]
                    MAINtable_array_temp[0, 8] = MDCMessagesArray[EqnCounter, 11]
                    MAINtable_array_temp[0, 9] = TotalOccurances_array[EqnCounter, SNCounter]

                    MAINtable_array_temp[0, 10] = ConsecutiveLegs_array[EqnCounter, SNCounter]
                    MAINtable_array_temp[0, 11] = IntermittentInLeg_array[EqnCounter, SNCounter]
                    MAINtable_array_temp[0, 12] = Flags_array[EqnCounter, SNCounter]

                    # if the input is empty set the priority to 4
                    if MDCMessagesArray[EqnCounter, 15] == 0:
                        MAINtable_array_temp[0, 13] = 4
                    else:
                        MAINtable_array_temp[0, 13] = MDCMessagesArray[EqnCounter, 15]

                    # For B1-006424 & B1-006430 Could MDC Trend tool assign Priority 3 if logged on A/C below 10340, 15317. Priority 1 if logged on 10340, 15317, 19001 and up
                    if MDCMessagesArray[EqnCounter, 12] == "B1-006424" or MDCMessagesArray[EqnCounter, 12] == "B1-006430":
                        if int(UniqueSerialNumArray[SNCounter]) <= 10340 and int(UniqueSerialNumArray[SNCounter]) > 10000:
                            MAINtable_array_temp[0, 13] = 3
                        elif int(UniqueSerialNumArray[SNCounter]) > 10340 and int(UniqueSerialNumArray[SNCounter]) < 11000:
                            MAINtable_array_temp[0, 13] = 1
                        elif int(UniqueSerialNumArray[SNCounter]) <= 15317 and int(UniqueSerialNumArray[SNCounter]) > 15000:
                            MAINtable_array_temp[0, 13] = 3
                        elif int(UniqueSerialNumArray[SNCounter]) > 15317 and int(UniqueSerialNumArray[SNCounter]) < 16000:
                            MAINtable_array_temp[0, 13] = 1
                        elif int(UniqueSerialNumArray[SNCounter]) >= 19001 and int(UniqueSerialNumArray[SNCounter]) < 20000:
                            MAINtable_array_temp[0, 13] = 1

                            # check the content of MHIRJ ISE recommendation and add to array
                    if MDCMessagesArray[EqnCounter, 16] == 0:
                        MAINtable_array_temp[0, 15] = ""
                    else:
                        MAINtable_array_temp[0, 15] = MDCMessagesArray[EqnCounter, 16]

                    # check content of "additional"
                    if MDCMessagesArray[EqnCounter, 17] == 0:
                        MAINtable_array_temp[0, 16] = ""
                    else:
                        MAINtable_array_temp[0, 16] = MDCMessagesArray[EqnCounter, 17]

                    # check content of "MHIRJ Input"
                    if MDCMessagesArray[EqnCounter, 18] == 0:
                        MAINtable_array_temp[0, 17] = ""
                    else:
                        MAINtable_array_temp[0, 17] = MDCMessagesArray[EqnCounter, 18]

                    # Check for the equation in the Top Messages sheet
                    TopCounter = 0
                    Top_LastRow = TopMessagesArray.shape[0]
                    while TopCounter < Top_LastRow:

                        # Look for the flagged equation in the Top Messages Sheet
                        if MDCMessagesArray[EqnCounter][12] == TopMessagesArray[TopCounter, 4]:

                            # Found the equation in the Top Messages Sheet. Put the information in the last column
                            MAINtable_array_temp[0, 14] = "Known Nuissance: " + str(TopMessagesArray[TopCounter, 13]) \
                                                          + " / In-Service Document: " + str(
                                TopMessagesArray[TopCounter, 11]) \
                                                          + " / FIM Task: " + str(TopMessagesArray[TopCounter, 10]) \
                                                          + " / Remarks: " + str(TopMessagesArray[TopCounter, 14])

                            # Not need to keep looking
                            TopCounter = TopMessagesArray.shape[0]

                        else:
                            # Not equal, go to next equation
                            MAINtable_array_temp[0, 14] = ""
                            TopCounter += 1
                    # End while

                    if currentRow == 0:
                        MAINtable_array = np.array(MAINtable_array_temp)
                    else:
                        MAINtable_array = np.append(MAINtable_array, MAINtable_array_temp, axis=0)
                    # End if Build MAINtable_array

                    # Move to next Row on Main page for next flag
                    currentRow = currentRow + 1

    TitlesArrayDaily = ["Date", "AC SN", "EICAS Message", "MDC Message", "LRU", "ATA", "B1-Equation", "Type",
                        "Equation Description", "Total Occurences", "Consecutive FL",
                        "Intermittent", "Reason(s) for flag", "Priority", "Known Top Message - Recommended Documents",
                        "MHIRJ ISE Recommendation", "Additional Comments", "MHIRJ ISE Input"]
    # Converts the Numpy Array to Dataframe to manipulate
    # pd.set_option('display.max_rows', None)
    OutputTableDaily = pd.DataFrame(data=MAINtable_array, columns=TitlesArrayDaily).fillna(" ").sort_values(
        by=["Date", "Type", "Priority"])

    print(OutputTableDaily)
    OutputTableDaily.to_csv("OutputTableDaily.csv")
    output = []
    reader = OutputTableDaily.to_dict()
    '''
    with open("OutputTableDaily.csv","r") as f:
        reader = csv.DictReader(f)
    
        for records in reader:
            output.append(records)
    '''
    json_daily = json.dumps(reader, sort_keys=True, indent=4)
    return json_daily





    '''
    CurrentFlightPhaseEnabled = 0 # 1 or 0, 1 includes current phase, 0 does not include current phase
    MaxAllowedOccurances = 2 # flag for Total number of occurences -> T
    MaxAllowedConsecLegs = 3 # flag for consecutive legs -> CF
    MaxAllowedIntermittent = 5 # flag for intermittent values ->IM
    '''


# Toreport/1/15092/B1-005812/1/0


@app.post("/OutputTableHistory/{CurrentFlightPhaseEnabled}/{MaxAllowedOccurances}/{MaxAllowedConsecDays}/{MaxAllowedConsecLegs}/{MaxAllowedIntermittent}")
async def parsehistory(CurrentFlightPhaseEnabled: int, MaxAllowedOccurances: int, MaxAllowedConsecDays: int, MaxAllowedConsecLegs: int, MaxAllowedIntermittent: int):

    global UniqueSerialNumArray

    HistoryanalysisDF = MDCdataDF
    ShapeHistoryanalysisDF = HistoryanalysisDF.shape  # tuple of the shape of the history data (#rows, #columns)
    HistoryanalysisArray = MDCdataArray
    NumAC = HistoryanalysisDF["Aircraft"].nunique()  # number of unique aircraft SN in the data
    UniqueSerialNumArray = HistoryanalysisDF.Aircraft.unique()  # unique aircraft values
    SerialNumFreqSeries = HistoryanalysisDF.Aircraft.value_counts()  # the index of this var contains the AC with the most occurrences
    MaxOfAnAC = SerialNumFreqSeries[0]  # the freq series sorts in descending order, max value is top

    # Define the arrays as numpy
    MDCeqns_array = np.empty((MaxOfAnAC, NumAC), object)  # MDC messages for each AC stored in one array
    MDCDates_array = np.empty((MaxOfAnAC, NumAC), object)  # Dates for a message for each AC stored in one array
    MDCLegs_array = np.empty((MaxOfAnAC, NumAC), object)  # Flight Legs for a message for each AC stored in one array
    MDCIntermittent_array = np.empty((MaxOfAnAC, NumAC),
                                     object)  # stores the intermittence values for each message of each array
    FourDigATA_array = np.empty((MaxOfAnAC, NumAC), object)  # stores the 4digATAs of each message in one array
    TwoDigATA_array = np.empty((MaxOfAnAC, NumAC), object)  # stores the 2digATAs of each message in one array
    global MDCeqns_arrayforgraphing
    MDCeqns_arrayforgraphing = np.empty((MaxOfAnAC, NumAC),
                                        object)  # MDC messages for each AC stored in an array for graphing, due to current messages issue

    if CurrentFlightPhaseEnabled == 1:  # Show all, current and history
        MDCFlightPhase_array = np.ones((MaxOfAnAC, NumAC), int)
    elif CurrentFlightPhaseEnabled == 0:  # Only show history
        MDCFlightPhase_array = np.empty((MaxOfAnAC, NumAC), object)

    Messages_LastRow = ShapeMDCMessagesArray[0]  # taken from the shape of the array
    Flags_array = np.empty((Messages_LastRow, NumAC), object)
    FlightLegsEx = 'Flight legs above 32,600 for the following A/C: '  # at 32767 the DCU does not incrementmore the flight counter, so the MDC gets data for the same 32767 over and over until the limit of MDC logs per flight leg is reached (20 msgs per leg), when reached the MDC stops storing data since it gets always the same 32767
    TotalOccurances_array = np.empty((Messages_LastRow, NumAC), int)
    ConsecutiveDays_array = np.empty((Messages_LastRow, NumAC), int)
    ConsecutiveLegs_array = np.empty((Messages_LastRow, NumAC), int)
    IntermittentInLeg_array = np.empty((Messages_LastRow, NumAC), int)

    # 2D array looping, columns (SNcounter) rows (MDCsheetcounter)
    for SNCounter in range(0, NumAC):  # start counter over each aircraft (columns)

        MDCArrayCounter = 0  # rows of each different array

        for MDCsheetCounter in range(0, ShapeHistoryanalysisDF[0]):  # counter over each entry  (rows)

            # If The Serial number on the historyanalysisarray matches the current Serial Number, copy
            if HistoryanalysisArray[MDCsheetCounter, 0] == UniqueSerialNumArray[SNCounter]:
                # Serial numbers match, record information
                #       SNcounter -->
                # format for these arrays :   | AC1 | AC2 | AC3 |.... | NumAC
                # MDCarraycounter(vertically)| xx | xx | xx |...
                MDCeqns_array[MDCArrayCounter, SNCounter] = HistoryanalysisArray[MDCsheetCounter, 14]
                MDCDates_array[MDCArrayCounter, SNCounter] = HistoryanalysisArray[MDCsheetCounter, 8]
                MDCLegs_array[MDCArrayCounter, SNCounter] = HistoryanalysisArray[MDCsheetCounter, 2]
                MDCIntermittent_array[MDCArrayCounter, SNCounter] = HistoryanalysisArray[MDCsheetCounter, 13]

                if HistoryanalysisArray[MDCsheetCounter, 11]:  # populating counts array
                    FourDigATA_array[MDCArrayCounter, SNCounter] = HistoryanalysisArray[MDCsheetCounter, 5]
                    TwoDigATA_array[MDCArrayCounter, SNCounter] = HistoryanalysisArray[MDCsheetCounter, 3]

                if CurrentFlightPhaseEnabled == 0:  # populating the empty array
                    MDCFlightPhase_array[MDCArrayCounter, SNCounter] = HistoryanalysisArray[MDCsheetCounter, 11]

                MDCArrayCounter = MDCArrayCounter + 1

        # arrays with the same size as the MDC messages sheet (3519) checks if each message exists in each ac
        for MessagessheetCounter in range(0, Messages_LastRow):

            # Initialize Counts, etc

            # Total Occurances
            eqnCount = 0

            # Consecutive Days
            ConsecutiveDays = 0
            MaxConsecutiveDays = 0
            tempDate = pd.to_datetime(latestDay)
            DaysCount = 0

            # Consecutive Legs
            ConsecutiveLegs = 0
            MaxConsecutiveLegs = 0
            tempLeg = LastLeg

            # Intermittent
            IntermittentFlightLegs = 0

            MDCArrayCounter = 0

            while MDCArrayCounter < MaxOfAnAC:
                if MDCeqns_array[MDCArrayCounter, SNCounter]:
                    # Not Empty, and not current                                      B code
                    if MDCeqns_array[MDCArrayCounter, SNCounter] == MDCMessagesArray[MessagessheetCounter, 12] \
                            and MDCFlightPhase_array[MDCArrayCounter, SNCounter]:

                        MDCeqns_arrayforgraphing[MDCArrayCounter, SNCounter] = MDCeqns_array[MDCArrayCounter, SNCounter]

                        # Total Occurances
                        # Count this as 1 occurance
                        eqnCount = eqnCount + 1

                        # Consecutive Days
                        currentdate = pd.to_datetime(MDCDates_array[MDCArrayCounter, SNCounter])
                        if currentdate.day == tempDate.day \
                                and currentdate.month == tempDate.month \
                                and currentdate.year == tempDate.year:

                            DaysCount = 1  # 1 because consecutive means 1 day since it occured
                            tempDate = tempDate - datetime.timedelta(1)
                            ConsecutiveDays = ConsecutiveDays + 1

                            if ConsecutiveDays >= MaxConsecutiveDays:
                                MaxConsecutiveDays = ConsecutiveDays

                        elif MDCDates_array[MDCArrayCounter, SNCounter] < tempDate:

                            # If not consecutive, start over
                            if ConsecutiveDays >= MaxConsecutiveDays:
                                MaxConsecutiveDays = ConsecutiveDays

                            ConsecutiveDays = 1
                            # Days count is the delta betqeen this current date and the previous temp date
                            DaysCount += abs(tempDate - currentdate).days + 1
                            tempDate = currentdate - datetime.timedelta(1)

                        # Consecutive Legs
                        if MDCLegs_array[MDCArrayCounter, SNCounter] == tempLeg:

                            tempLeg = tempLeg - 1
                            ConsecutiveLegs = ConsecutiveLegs + 1

                            if ConsecutiveLegs > MaxConsecutiveLegs:
                                MaxConsecutiveLegs = ConsecutiveLegs

                        else:

                            # If not consecutive, start over
                            ConsecutiveLegs = 1
                            tempLeg = MDCLegs_array[MDCArrayCounter, SNCounter]

                        # Intermittent
                        # Taking the maximum intermittent value
                        x = MDCIntermittent_array[MDCArrayCounter, SNCounter]
                        if isinstance(x, numbers.Number) and MDCIntermittent_array[
                            MDCArrayCounter, SNCounter] > IntermittentFlightLegs:
                            IntermittentFlightLegs = MDCIntermittent_array[MDCArrayCounter, SNCounter]
                        # End if Intermittent numeric check

                        # Other
                        # Check that the legs is not over the given limit
                        Flags_array[MessagessheetCounter, SNCounter] = ''

                        #Error corrected here

                        if MDCLegs_array[MDCArrayCounter, SNCounter] > 32600:
                            FlightLegsEx = FlightLegsEx + str(UniqueSerialNumArray[SNCounter]) + ' (' + str(
                                MDCLegs_array[MDCArrayCounter, SNCounter]) + ')' + ' '
                        # End if Legs flag

                        # Check for Other Flags
                        if MDCMessagesArray[MessagessheetCounter, 13]:
                            # Immediate (occurrance flag in excel MDC Messages sheet)
                            if MDCMessagesArray[MessagessheetCounter, 13] == 1:
                                # Immediate Flag required
                                Flags_array[MessagessheetCounter, SNCounter] = str(
                                    MDCMessagesArray[MessagessheetCounter, 12]) + " occured at least once."

                    MDCArrayCounter += 1

                else:
                    MDCArrayCounter = MaxOfAnAC

                    # Next MDCArray Counter

            TotalOccurances_array[MessagessheetCounter, SNCounter] = eqnCount
            ConsecutiveDays_array[MessagessheetCounter, SNCounter] = MaxConsecutiveDays
            ConsecutiveLegs_array[MessagessheetCounter, SNCounter] = MaxConsecutiveLegs
            IntermittentInLeg_array[MessagessheetCounter, SNCounter] = IntermittentFlightLegs

        # Next MessagessheetCounter
    # Next SNCounter

    MAINtable_array_temp = np.empty((1, 18), object)  # 18 because its history #????????
    currentRow = 0
    MAINtable_array = []
    for SNCounter in range(0, NumAC):
        for EqnCounter in range(0, Messages_LastRow):

            # Continue with Report
            if TotalOccurances_array[EqnCounter, SNCounter] >= MaxAllowedOccurances \
                    or ConsecutiveDays_array[EqnCounter, SNCounter] >= MaxAllowedConsecDays \
                    or ConsecutiveLegs_array[EqnCounter, SNCounter] >= MaxAllowedConsecLegs \
                    or IntermittentInLeg_array[EqnCounter, SNCounter] >= MaxAllowedIntermittent \
                    or Flags_array[EqnCounter, SNCounter]:

                # Populate Flags Array
                if TotalOccurances_array[EqnCounter, SNCounter] >= MaxAllowedOccurances:
                    Flags_array[EqnCounter, SNCounter] = Flags_array[
                                                             EqnCounter, SNCounter] + "Total occurances exceeded " + str(
                        MaxAllowedOccurances) + " occurances. "

                if ConsecutiveDays_array[EqnCounter, SNCounter] >= MaxAllowedConsecDays:
                    Flags_array[EqnCounter, SNCounter] = Flags_array[
                                                             EqnCounter, SNCounter] + "Maximum consecutive days exceeded " + str(
                        MaxAllowedConsecDays) + " days. "

                if ConsecutiveLegs_array[EqnCounter, SNCounter] >= MaxAllowedConsecLegs:
                    Flags_array[EqnCounter, SNCounter] = Flags_array[
                                                             EqnCounter, SNCounter] + "Maximum consecutive flight legs exceeded " + str(
                        MaxAllowedConsecLegs) + " flight legs. "

                if IntermittentInLeg_array[EqnCounter, SNCounter] >= MaxAllowedIntermittent:
                    Flags_array[EqnCounter, SNCounter] = Flags_array[
                                                             EqnCounter, SNCounter] + "Maximum intermittent occurances for one flight leg exceeded " + str(
                        MaxAllowedIntermittent) + " occurances. "

                # populating the final array (Table)
                MAINtable_array_temp[0, 0] = UniqueSerialNumArray[SNCounter]
                MAINtable_array_temp[0, 1] = MDCMessagesArray[EqnCounter, 8]
                MAINtable_array_temp[0, 2] = MDCMessagesArray[EqnCounter, 4]
                MAINtable_array_temp[0, 3] = MDCMessagesArray[EqnCounter, 0]
                MAINtable_array_temp[0, 4] = MDCMessagesArray[EqnCounter, 1]
                MAINtable_array_temp[0, 5] = MDCMessagesArray[EqnCounter, 12]
                MAINtable_array_temp[0, 6] = MDCMessagesArray[EqnCounter, 7]
                MAINtable_array_temp[0, 7] = MDCMessagesArray[EqnCounter, 11]
                MAINtable_array_temp[0, 8] = TotalOccurances_array[EqnCounter, SNCounter]
                MAINtable_array_temp[0, 9] = ConsecutiveDays_array[EqnCounter, SNCounter]
                MAINtable_array_temp[0, 10] = ConsecutiveLegs_array[EqnCounter, SNCounter]
                MAINtable_array_temp[0, 11] = IntermittentInLeg_array[EqnCounter, SNCounter]
                MAINtable_array_temp[0, 12] = Flags_array[EqnCounter, SNCounter]

                # if the input is empty set the priority to 4
                if MDCMessagesArray[EqnCounter, 15] == 0:
                    MAINtable_array_temp[0, 13] = 4
                else:
                    MAINtable_array_temp[0, 13] = MDCMessagesArray[EqnCounter, 15]

                # For B1-006424 & B1-006430 Could MDC Trend tool assign Priority 3 if logged on A/C below 10340, 15317. Priority 1 if logged on 10340, 15317, 19001 and up
                if MDCMessagesArray[EqnCounter, 12] == "B1-006424" or MDCMessagesArray[EqnCounter, 12] == "B1-006430":
                    if int(UniqueSerialNumArray[SNCounter]) <= 10340 and int(UniqueSerialNumArray[SNCounter]) > 10000:
                        MAINtable_array_temp[0, 13] = 3
                    elif int(UniqueSerialNumArray[SNCounter]) > 10340 and int(UniqueSerialNumArray[SNCounter]) < 11000:
                        MAINtable_array_temp[0, 13] = 1
                    elif int(UniqueSerialNumArray[SNCounter]) <= 15317 and int(UniqueSerialNumArray[SNCounter]) > 15000:
                        MAINtable_array_temp[0, 13] = 3
                    elif int(UniqueSerialNumArray[SNCounter]) > 15317 and int(UniqueSerialNumArray[SNCounter]) < 16000:
                        MAINtable_array_temp[0, 13] = 1
                    elif int(UniqueSerialNumArray[SNCounter]) >= 19001 and int(UniqueSerialNumArray[SNCounter]) < 20000:
                        MAINtable_array_temp[0, 13] = 1

                # check the content of MHIRJ ISE recommendation and add to array
                if MDCMessagesArray[EqnCounter, 16] == 0:
                    MAINtable_array_temp[0, 15] = ""
                else:
                    MAINtable_array_temp[0, 15] = MDCMessagesArray[EqnCounter, 16]

                # check content of "additional"
                if MDCMessagesArray[EqnCounter, 17] == 0:
                    MAINtable_array_temp[0, 16] = ""
                else:
                    MAINtable_array_temp[0, 16] = MDCMessagesArray[EqnCounter, 17]

                # check content of "MHIRJ Input"
                if MDCMessagesArray[EqnCounter, 18] == 0:
                    MAINtable_array_temp[0, 17] = ""
                else:
                    MAINtable_array_temp[0, 17] = MDCMessagesArray[EqnCounter, 18]

                # Check for the equation in the Top Messages sheet
                TopCounter = 0
                Top_LastRow = TopMessagesArray.shape[0]
                while TopCounter < Top_LastRow:

                    # Look for the flagged equation in the Top Messages Sheet
                    if MDCMessagesArray[EqnCounter][12] == TopMessagesArray[TopCounter, 4]:

                        # Found the equation in the Top Messages Sheet. Put the information in the last column
                        MAINtable_array_temp[0, 14] = "Known Nuissance: " + str(TopMessagesArray[TopCounter, 13]) \
                                                      + " / In-Service Document: " + str(
                            TopMessagesArray[TopCounter, 11]) \
                                                      + " / FIM Task: " + str(TopMessagesArray[TopCounter, 10]) \
                                                      + " / Remarks: " + str(TopMessagesArray[TopCounter, 14])

                        # Not need to keep looking
                        TopCounter = TopMessagesArray.shape[0]

                    else:
                        # Not equal, go to next equation
                        MAINtable_array_temp[0, 14] = ""
                        TopCounter += 1
                # End while

                if currentRow == 0:
                    MAINtable_array = np.array(MAINtable_array_temp)
                else:
                    MAINtable_array = np.append(MAINtable_array, MAINtable_array_temp, axis=0)
                # End if Build MAINtable_array

                # Move to next Row on Main page for next flag
                currentRow = currentRow + 1
    TitlesArrayHistory = ["AC SN", "EICAS Message", "MDC Message", "LRU", "ATA", "B1-Equation", "Type",
                          "Equation Description", "Total Occurences", "Consective Days", "Consecutive FL",
                          "Intermittent", "Reason(s) for flag", "Priority", "Known Top Message - Recommended Documents",
                          "MHIRJ ISE Recommendation", "Additional Comments", "MHIRJ ISE Input"]

    # Converts the Numpy Array to Dataframe to manipulate
    # pd.set_option('display.max_rows', None)
    # Main table
    global OutputTableHistory
    OutputTableHistory = pd.DataFrame(data=MAINtable_array, columns=TitlesArrayHistory).fillna(" ").sort_values(
        by=["Type", "Priority"])
    OutputTableHistory.to_csv("OutputTableHistory.csv")
    output = []
    reader = OutputTableHistory.to_dict()
    '''
    with open("OutputTableDaily.csv","r") as f:
        reader = csv.DictReader(f)

        for records in reader:
            output.append(records)
    '''
    json_history = json.dumps(reader, sort_keys=True, indent=4)
    return json_history

@app.post("/OutputTableAircraft/{Aircraft}") #Its for cell #7
async def parseAircraft(Aircraft: int):
    MDCdataDFbyAC = MDCdataDF.set_index("Aircraft")
    AircraftDF = MDCdataDFbyAC.loc["10294"]
    AircraftDF.to_csv("OutputTableAircraft.csv")
    AircraftDF["DateAndTime"] = AircraftDF["DateAndTime"].astype(str)
    reader = AircraftDF.to_dict()
    json_aircraft = json.dumps(reader, sort_keys=True, indent=4)
    return json_aircraft



@app.post("/Toreport/{Flagsreport}/{AircraftSN}/{Bcode}/{newreport}/{CurrentFlightPhaseEnabled}")
# create a flags report
def Toreport(Flagsreport: int, AircraftSN: str, Bcode: str, newreport: int, CurrentFlightPhaseEnabled: int):
    '''Populates a report with input from the previous report, aircraft serial number and B1 message code'''
    # if the user wants a brand new report
    #print(OutputTableHistory)
    HistoryReport = OutputTableHistory
    if newreport:
        del Flagsreport
        Flagsreport = pd.DataFrame(data=None, columns=["MSN", "ATA", "B1-code", "LRU", "Message",
                                                       "Type", "Potential FDE", "Date From", "Date To",
                                                       "SKW action WIP", "ISE Input", "ISE Rec Act"])
    indexedreport = HistoryReport.set_index(["AC SN", "B1-Equation"])

    # creating dataframe to look at dates
    if CurrentFlightPhaseEnabled == 1:  # Show all, current and history
        DatesDF = MDCdataDF[["DateAndTime", "Equation ID", "Aircraft"]].copy()

    elif CurrentFlightPhaseEnabled == 0:  # Only show history
        DatesDF = MDCdataDF[["DateAndTime", "Equation ID", "Aircraft", "Flight Phase"]].copy()
        DatesDF = DatesDF.replace(False, np.nan).dropna(axis=0, how='any')
        DatesDF = DatesDF[["DateAndTime", "Equation ID", "Aircraft"]].copy()

    # this exists to check which dates are present for the specific aircraft and message chosen
    counts = pd.DataFrame(data=DatesDF.groupby(['Aircraft', "Equation ID", "DateAndTime"]).agg(len), columns=["Counts"])
    DatesfoundinMDCdata = counts.loc[(AircraftSN, Bcode)].resample('D')["Counts"].sum().index

    # create the new row that will be appended to the existing report
    newrow = indexedreport.loc[
        (AircraftSN, Bcode), ["ATA", "LRU", "MDC Message", "Type", "EICAS Message", "MHIRJ ISE Input",
                              "MHIRJ ISE Recommendation"]].to_frame().transpose()
    newrow.insert(loc=0, column="AC SN", value=AircraftSN)
    newrow.insert(loc=2, column="B1-code", value=Bcode)
    newrow.insert(loc=7, column="Date From",
                  value=DatesfoundinMDCdata.min().date())  # .date()removes the time data from datetime format
    newrow.insert(loc=8, column="Date To", value=DatesfoundinMDCdata.max().date())
    newrow.insert(loc=9, column="SKW action WIP", value="")
    newrow = newrow.rename(columns={"AC SN": "MSN", "MDC Message": "Message", "EICAS Message": "Potential FDE",
                                    "MHIRJ ISE Input": "ISE Input",
                                    "MHIRJ ISE Recommendation": "ISE Rec Act"})

    # append the new row to the existing report
    Flagsreport = Flagsreport.append(newrow, ignore_index=True)
    Flagsreport.to_excel("FlagReport.xlsx")
    Flagsreport["Date From"] = Flagsreport["Date From"].astype(str)
    Flagsreport["Date To"] = Flagsreport["Date To"].astype(str)
    reader = Flagsreport.to_dict()
    json_flagreport = json.dumps(reader, sort_keys=True, indent=4)
    return json_flagreport

#B1 messages analyses
@app.post("/Bchart/{AircraftToStudy}/{Topvalues}")
def Bchart(AircraftToStudy: str, Topvalues: int):
    # B1 Messages Occurence per Aircraft
    global MDCeqns_arrayforgraphing
    # Convert MDC equations numpy to Dataframe
    MDCequationsDF = pd.DataFrame(data=MDCeqns_arrayforgraphing,
                                  columns=UniqueSerialNumArray)
    messagesdescriptionDF = MDCMessagesDF[["Equation ID", "Message", "EICAS", "LRU", "ATA"]].set_index(["Equation ID"])

    # Count the occurrance of each message in each aircraft
    MessageOccuranceDF = MDCequationsDF.apply(pd.Series.value_counts)
    MessageOccuranceArray = MessageOccuranceDF.values

    messagestoshow = MessageOccuranceDF[AircraftToStudy].sort_values().dropna().tail(Topvalues).index.to_frame(
        index=False, name="Message")

    def Definelabels(messages, Messagedata=messagesdescriptionDF):
        '''Input of dataframe containing Bcode messages to be matched and joined with their respective descriptions'''
        for i in range(len(messages)):
            Bcode = messages.at[i, "Message"]
            LRUdata = Messagedata.loc[Bcode, "LRU"]
            ATAdata = Messagedata.loc[Bcode, "ATA"]
            messages.at[i, "Message"] = str(messages.at[i, "Message"] + "\n" + LRUdata + "\n" + ATAdata)
        return messages["Message"].to_list()

    Plottinglabels = Definelabels(messagestoshow)
    Plottingarray = MessageOccuranceDF[AircraftToStudy].sort_values().dropna().tail(Topvalues).values

    # Image settings
    spacing = np.arange(start=0, stop=len(Plottinglabels) * 2, step=2)  # label locations
    height = 0.9  # bar height
    fig1, ax1 = plt.subplots(
        figsize=(16, 9))  # objects for figure and axes, figsize controls the size of the output window
    rects1 = ax1.barh(spacing, Plottingarray, height=height, label=AircraftToStudy)

    # Add some text for labels, title and custom x-axis tick labels, etc.
    ax1.set_xlabel('Total Number of messages')
    ax1.set_title('Occurence of Messages in ' + AircraftToStudy)
    ax1.set_yticks(spacing)
    ax1.set_yticklabels(Plottinglabels)
    ax1.grid(b=True, alpha=0.3)
    ax1.legend()

    def autolabel(rects):  # https://matplotlib.org/examples/api/barchart_demo.html
        """
        Attach a text label above each bar displaying its height
        """
        for rect in rects:
            width = rect.get_width()
            ax1.text(width, rect.get_y() + height / 2,  # position in graph
                     '%d' % int(width),  # text to be shown
                     ha='left')  # hor alignment

    autolabel(rects1)

    fig1.tight_layout()
    img_name = "B1Chart.png"
    plt.savefig(img_name)
    path = "./"+img_name
    return {"location": path}

#Bchart/10201/15

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    data = {
        "page":"Home page"
    }
    return templates.TemplateResponse("Demo_page.html", {"request": request, "data": data})







