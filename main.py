# Importing libraries to the project
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
import numbers
import datetime
import time
import sys
#import csv
import pyodbc
import re
import json
#from datetime import datetime
from flask import Flask, jsonify
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from typing import Optional
templates = Jinja2Templates(directory="templates")

app = FastAPI()
origins = [

    "https://GenerateReport/{analysisType}/{occurences}/{legs}/{intermittent}/{consecutiveDays}/{airlineOperator}/{ata}/{messages}/{fromDate}/{toDate}",

    "http://localhost",
    "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#####

#datatobeanalyzed_df = pd.read_sql_query(sql_stmt, conn)

#Datatobeanalyzed_path = r"C:\Users\User\MDCRawDataSKW2.csv"
#Datatobeanalyzed_path = "./MdcRawDataTest_5000.csv"
#MDCMessagesURL_path = r"C:\Users\User\MDCMessagesInputs.csv"
#TopMessagesURL_path = r"C:\Users\User\TopMessagesSheet.csv"

OutputTableHistory2 = pd.DataFrame()
MDCeqns_arrayforgraphing = pd.DataFrame()

hostname="mhirjserver.database.windows.net"
db_name="MHIRJ"
username="mhirj-admin"
password="KaranCool123"

CurrentFlightPhaseEnabled = 0
MDCdataDF = pd.DataFrame()

def convert_array_to_tuple(array_list):
    l1 = []
    l2 = []
    for i in array_list:
        l1.append(i)
        t = tuple(l1)
        l2.append(t)
        l1 = []

    return "(" + ', '.join('''{}'''.format(str(t[0])) for t in l2) + ")"

"""



try:
    conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                       user='mhirj-admin', password='KaranCool123')
except pyodbc.Error as err:
    print("Couldn't connect to Server")
    print("Error message:- "+err)


cursor = conn.cursor()

#SQL statement to get all rows from the database
#sql_stmt = "SELECT * FROM Airline_MDC_Data WHERE DateAndTime BETWEEN '"+from_date+"' AND '"+to_date+"'"

records = cursor.execute(sql_stmt)

#Reading Data from SQL database
MDCdataDF = pd.DataFrame((tuple(t) for t in records), columns = ["Aircraft", "Tail", "Flight Leg No",
                                                      "ATA Main","ATA Sub","ATA","ATA Description","LRU",
                                                      "DateAndTime","MDC Message","Status","Flight Phase","Type",
                                                      "Intermittent","Equation ID","Source","Diagnostic Data",
                                                      "Data Used to Determine Msg","ID","Flight","airline_id","aircraftno"])



# Reading CSV file
#MDCdataDF = pd.read_csv(Datatobeanalyzed_path, encoding="utf8")
"""
def connect_to_fetch_all_ata(from_dt, to_dt):
    all_ata_query = "SELECT DISTINCT ATA_Main from Airline_MDC_Data WHERE DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        all_ata_df = pd.read_sql(all_ata_query, conn)

        return all_ata_df
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + str(err))

def connect_to_fetch_all_eqids(from_dt, to_dt):
    all_ata_query = "SELECT DISTINCT Equation_ID from Airline_MDC_Data WHERE DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        all_eqid_df = pd.read_sql(all_ata_query, conn)

        return all_eqid_df
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + str(err))

def connect_database_MDCdata(ata, excl_eqid, airline_operator, include_current_message, from_dt, to_dt):
    global MDCdataDF
    global airline_id
    all_ata_str_list = []
    #ata_list = tuple(ata)
    #excl_eqid_list = tuple(excl_eqid)
    #for each_ata in ata:
    #    print(each_ata)
    if airline_operator.upper() == "SKW":
        print(airline_operator.upper())
        airline_id = 101

    if ata == 'ALL':
        all_ata = connect_to_fetch_all_ata(from_dt, to_dt)

        all_ata_str = "("
        all_ata_list = all_ata['ATA_Main'].tolist()
        for each_ata in all_ata_list:
            all_ata_str_list.append(str(each_ata))
            all_ata_str += "'"+str(each_ata)+"'"
            if each_ata != all_ata_list[-1]:
                all_ata_str += ","
            else:
                all_ata_str += ")"
        print(all_ata_str)

    if excl_eqid == 'NONE':
        all_eqid = connect_to_fetch_all_eqids(from_dt, to_dt)

        all_eqid_str = "("
        all_eqid_list = all_eqid['Equation_ID'].tolist()
        for each_eqid in all_eqid_list:
            #all_eqid_str_list.append(str(each_eqid))
            all_eqid_str += "'" + str(each_eqid) + "'"
            if each_eqid != all_eqid_list[-1]:
                all_eqid_str += ","
            else:
                all_eqid_str += ")"
        print(all_eqid_str)


    if include_current_message == 0:    # If we do not include current message
        if ata == 'ALL' and excl_eqid == 'NONE':
            sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(all_ata_str) + " AND Equation_ID IN " + str(
                all_eqid_str) + " AND airline_id = " + str(
                airline_id) + " AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
        elif excl_eqid == 'NONE':
            sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(ata) + " AND Equation_ID IN " + str(
                all_eqid_str) + " AND airline_id = " + str(
                airline_id) + " AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
        elif ata == 'ALL':
            sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(all_ata_str) + " AND Equation_ID NOT IN " + str(
                excl_eqid) + " AND airline_id = " + str(
                airline_id) + " AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
        else:
            sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(ata) + " AND Equation_ID NOT IN " + str(
                excl_eqid) + " AND airline_id = " + str(
                airline_id) + " AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"

    elif include_current_message == 1:
        if ata == 'ALL' and excl_eqid =='NONE':
            sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(all_ata_str) + " AND Equation_ID IN " + str(
                all_eqid_str) + " AND airline_id = " + str(
                airline_id) + " AND flight_phase IS NULL AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
        elif ata == 'ALL':
            sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(all_ata_str) + " AND Equation_ID NOT IN " + str(
                excl_eqid) + " AND airline_id = " + str(
                airline_id) + " AND flight_phase IS NULL AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
        elif excl_eqid == 'NONE':
            sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(ata) + " AND Equation_ID IN " + str(
                all_eqid_str) + " AND airline_id = " + str(
                airline_id) + " AND flight_phase IS NULL AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
        else:
            sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(ata) + " AND Equation_ID NOT IN " + str(
                excl_eqid) + " AND airline_id = " + str(
                airline_id) + " AND flight_phase IS NULL AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"

    column_names = ["Aircraft", "Tail", "Flight Leg No",
               "ATA Main", "ATA Sub", "ATA", "ATA Description", "LRU",
               "DateAndTime", "MDC Message", "Status", "Flight Phase", "Type",
               "Intermittent", "Equation ID", "Source", "Diagnostic Data",
               "Data Used to Determine Msg", "ID", "Flight", "airline_id", "aircraftno"]
    print(sql)
    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        MDCdataDF = pd.read_sql(sql, conn)
        MDCdataDF.columns = column_names
        return MDCdataDF
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + str(err))
"""
def connect_database_MDCdata2(ata, from_dt, to_dt, equation_id, bcode):
    global MDCdataDF
    sql = "SELECT top 1000 * FROM Airline_MDC_Data WHERE ATA_Main in '" + ata + "' AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "' AND Equation_ID not in '" + bcode + "' ";
    column_names = ["Aircraft", "Tail", "Flight Leg No",
               "ATA Main", "ATA Sub", "ATA", "ATA Description", "LRU",
               "DateAndTime", "MDC Message", "Status", "Flight Phase", "Type",
               "Intermittent", "Equation ID", "Source", "Diagnostic Data",
               "Data Used to Determine Msg", "ID", "Flight", "airline_id", "aircraftno"]

    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        MDCdataDF = pd.read_sql(sql, conn)
        MDCdataDF.columns = column_names
        return MDCdataDF
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + str(err))
"""
def connect_database_MDCmessagesInputs():
    global MDCMessagesDF
    sql = "SELECT * FROM MDCMessagesInputs"

    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        # add column names from csv file into dataframe
        MDCMessagesDF = pd.read_sql(sql, conn)
        return MDCMessagesDF
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + err)

def connect_database_TopMessagesSheet():
    global TopMessagesDF
    sql = "SELECT * FROM TopMessagesSheet"

    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        TopMessagesDF = pd.read_sql(sql, conn)
        return TopMessagesDF
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + err)

@app.post("/MDCRawData/{ATAMain_list}/{exclude_EqID_list}/{airline_operator}/{include_current_message}/{fromDate}/{toDate}")
async def get_MDCRawData(ATAMain_list:str, exclude_EqID_list:str, airline_operator:str, include_current_message:int, fromDate: str , toDate: str):

    c = connect_database_MDCdata(ATAMain_list, exclude_EqID_list, airline_operator, include_current_message, fromDate, toDate)
    #print(c['DateAndTime'].astype('datetime64[s]'))
    #c['DateAndTime'] = c['DateAndTime'].astype('datetime64[s]')
    c['DateAndTime'] = c['DateAndTime'].str.strip(':00.0000000')
    MDCdataDF_json = c.to_json(orient='records')
    return MDCdataDF_json
#    return jsonify(MDCdataDF_json1)



#for Daily Report: value of consecutiveDays = 0 in URL -> for reference!!       ('32','22')/('B1-007553', 'B1-246748')/skw/1/2020-11-11/2020-11-12
@app.post("/GenerateReport/{analysisType}/{occurences}/{legs}/{intermittent}/{consecutiveDays}/{ata}/{exclude_EqID}/{airline_operator}/{include_current_message}/{fromDate}/{toDate}")
async def generateReport(analysisType: str, occurences: int, legs: int, intermittent: int, consecutiveDays: int, ata: str, exclude_EqID:str, airline_operator: str, include_current_message: int, fromDate: str , toDate: str):
    print(fromDate, " ", toDate)

    MDCdataDF = connect_database_MDCdata(ata, exclude_EqID, airline_operator, include_current_message, fromDate, toDate)
    print(MDCdataDF)
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

    # MDCMessagesDF = pd.read_csv(MDCMessagesURL_path, encoding="utf8")  # bring messages and inputs into a Dataframe
    MDCMessagesDF = connect_database_MDCmessagesInputs()
    MDCMessagesArray = MDCMessagesDF.to_numpy()  # converting to numpy to work with arrays
    ShapeMDCMessagesArray = MDCMessagesArray.shape  # tuple of the shape of the MDC message data (#rows, #columns)

    # TopMessagesDF = pd.read_csv(TopMessagesURL_path)  # bring messages and inputs into a Dataframe
    TopMessagesDF = connect_database_TopMessagesSheet()
    TopMessagesArray = TopMessagesDF.to_numpy()  # converting to numpy to work with arrays

    UniqueSerialNumArray = []

    if(airline_operator.upper() == "SKW"):
        airline_id = 101
    Flagsreport = 1  # this is here to initialize the variable. user must start report by choosing Newreport = True
    # Flagsreport: int, AircraftSN: str, , newreport: int, CurrentFlightPhaseEnabled: int
    if(include_current_message == 1):
        CurrentFlightPhaseEnabled = 1
    else:
        CurrentFlightPhaseEnabled = 0  # 1 or 0, 1 includes current phase, 0 does not include current phase
    MaxAllowedOccurances = occurences  # flag for Total number of occurences -> T
    MaxAllowedConsecLegs = legs  # flag for consecutive legs -> CF
    MaxAllowedIntermittent = intermittent  # flag for intermittent values ->IM
    MaxAllowedConsecDays = consecutiveDays
    #Bcode = equationID
    newreport = True    #set a counter variable to bring back it to false

    if(analysisType == "daily"):

        #global UniqueSerialNumArray

        # function to separate the chunks of data and convert it into a numpy array
        def separate_data(data, date):
            '''Takes data as a dataframe, along with a date to slice the larger data to only include the data in that date'''

            DailyDataDF = data.loc[date]
            return DailyDataDF

        AnalysisDF = MDCdataDF.set_index(
            "DateAndTime")  # since dateandtime was moved to the index of the DF, the column values change from the original MDCdataDF

        currentRow = 0
        MAINtable_array_temp = np.empty((1, 18), object)  # 18 for the date #input from user
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
            MDCLegs_array = np.empty((MaxOfAnAC, NumAC),
                                     object)  # Flight Legs for a message for each AC stored in one array
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
                        if MDCMessagesArray[EqnCounter, 12] == "B1-006424" or MDCMessagesArray[
                            EqnCounter, 12] == "B1-006430":
                            if int(UniqueSerialNumArray[SNCounter]) <= 10340 and int(
                                    UniqueSerialNumArray[SNCounter]) > 10000:
                                MAINtable_array_temp[0, 13] = 3
                            elif int(UniqueSerialNumArray[SNCounter]) > 10340 and int(
                                    UniqueSerialNumArray[SNCounter]) < 11000:
                                MAINtable_array_temp[0, 13] = 1
                            elif int(UniqueSerialNumArray[SNCounter]) <= 15317 and int(
                                    UniqueSerialNumArray[SNCounter]) > 15000:
                                MAINtable_array_temp[0, 13] = 3
                            elif int(UniqueSerialNumArray[SNCounter]) > 15317 and int(
                                    UniqueSerialNumArray[SNCounter]) < 16000:
                                MAINtable_array_temp[0, 13] = 1
                            elif int(UniqueSerialNumArray[SNCounter]) >= 19001 and int(
                                    UniqueSerialNumArray[SNCounter]) < 20000:
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

        OutputTableDaily_json = OutputTableDaily.to_json(orient = 'records')
        OutputTableDaily.to_csv("OutputTableDaily.csv")

        return OutputTableDaily_json

    elif(analysisType == "history"):
        #global UniqueSerialNumArray

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
        MDCLegs_array = np.empty((MaxOfAnAC, NumAC),
                                 object)  # Flight Legs for a message for each AC stored in one array
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

                            MDCeqns_arrayforgraphing[MDCArrayCounter, SNCounter] = MDCeqns_array[
                                MDCArrayCounter, SNCounter]

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
                                # Days count is the delta between this current date and the previous temp date
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

                            # Error corrected here

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
                    if MDCMessagesArray[EqnCounter, 12] == "B1-006424" or MDCMessagesArray[
                        EqnCounter, 12] == "B1-006430":
                        if int(UniqueSerialNumArray[SNCounter]) <= 10340 and int(
                                UniqueSerialNumArray[SNCounter]) > 10000:
                            MAINtable_array_temp[0, 13] = 3
                        elif int(UniqueSerialNumArray[SNCounter]) > 10340 and int(
                                UniqueSerialNumArray[SNCounter]) < 11000:
                            MAINtable_array_temp[0, 13] = 1
                        elif int(UniqueSerialNumArray[SNCounter]) <= 15317 and int(
                                UniqueSerialNumArray[SNCounter]) > 15000:
                            MAINtable_array_temp[0, 13] = 3
                        elif int(UniqueSerialNumArray[SNCounter]) > 15317 and int(
                                UniqueSerialNumArray[SNCounter]) < 16000:
                            MAINtable_array_temp[0, 13] = 1
                        elif int(UniqueSerialNumArray[SNCounter]) >= 19001 and int(
                                UniqueSerialNumArray[SNCounter]) < 20000:
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
                              "Intermittent", "Reason(s) for flag", "Priority",
                              "Known Top Message - Recommended Documents",
                              "MHIRJ ISE Recommendation", "Additional Comments", "MHIRJ ISE Input"]

        # Converts the Numpy Array to Dataframe to manipulate
        # pd.set_option('display.max_rows', None)
        # Main table
        global OutputTableHistory
        OutputTableHistory = pd.DataFrame(data=MAINtable_array, columns=TitlesArrayHistory).fillna(" ").sort_values(
            by=["Type", "Priority"])
        OutputTableHistory.to_csv("OutputTableHistory.csv")
        OutputTableHistory_json = OutputTableHistory.to_json(orient = 'records')
        return OutputTableHistory_json



# Flags Report

#for Daily Report: value of consecutiveDays = 0 in URL -> for reference!!       ('32','22')/('B1-007553', 'B1-246748')/skw/1/2020-11-11/2020-11-12
@app.post("/GenerateReport/{analysisType}/{occurences}/{legs}/{intermittent}/{consecutiveDays}/{ata}/{exclude_EqID}/{airline_operator}/{include_current_message}/{fromDate}/{toDate}/{acsn}/{bcode}")
async def generateFlagReport(analysisType: str, occurences: int, legs: int, intermittent: int, consecutiveDays: int, ata: str, exclude_EqID:str, airline_operator: str, include_current_message: int, fromDate: str , toDate: str, acsn:str, bcode:str):
    print(fromDate, " ", toDate)
    """
    OutputTableHistory_json = generateReport('history',occurences,legs,intermittent,consecutiveDays,ata,exclude_EqID,airline_operator,include_current_message,fromDate,toDate)
    OTH_dict = json.loads(OutputTableHistory_json)
    OutputTableHistory_df = pd.DataFrame.from_dict(OTH_dict,orient = 'records')
    print(OutputTableHistory_df)

    """
    MDCdataDF = connect_database_MDCdata(ata, exclude_EqID, airline_operator, include_current_message, fromDate, toDate)
    print(MDCdataDF)
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

    # MDCMessagesDF = pd.read_csv(MDCMessagesURL_path, encoding="utf8")  # bring messages and inputs into a Dataframe
    MDCMessagesDF = connect_database_MDCmessagesInputs()
    MDCMessagesArray = MDCMessagesDF.to_numpy()  # converting to numpy to work with arrays
    ShapeMDCMessagesArray = MDCMessagesArray.shape  # tuple of the shape of the MDC message data (#rows, #columns)

    # TopMessagesDF = pd.read_csv(TopMessagesURL_path)  # bring messages and inputs into a Dataframe
    TopMessagesDF = connect_database_TopMessagesSheet()
    TopMessagesArray = TopMessagesDF.to_numpy()  # converting to numpy to work with arrays

    UniqueSerialNumArray = []

    if (airline_operator.upper() == "SKW"):
        airline_id = 101

    if (include_current_message == 1):
        CurrentFlightPhaseEnabled = 1
    else:
        CurrentFlightPhaseEnabled = 0  # 1 or 0, 1 includes current phase, 0 does not include current phase

    MaxAllowedOccurances = occurences  # flag for Total number of occurences -> T
    MaxAllowedConsecLegs = legs  # flag for consecutive legs -> CF
    MaxAllowedIntermittent = intermittent  # flag for intermittent values ->IM
    MaxAllowedConsecDays = consecutiveDays

    # Flags parameters
    Flagsreport = 1
    AircraftSN = acsn
    Bcode = bcode
    newreport = True

    if (analysisType == "history"):
        # global UniqueSerialNumArray

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
        MDCLegs_array = np.empty((MaxOfAnAC, NumAC),
                                 object)  # Flight Legs for a message for each AC stored in one array
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

                            MDCeqns_arrayforgraphing[MDCArrayCounter, SNCounter] = MDCeqns_array[
                                MDCArrayCounter, SNCounter]

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
                                # Days count is the delta between this current date and the previous temp date
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

                            # Error corrected here

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
                    if MDCMessagesArray[EqnCounter, 12] == "B1-006424" or MDCMessagesArray[
                        EqnCounter, 12] == "B1-006430":
                        if int(UniqueSerialNumArray[SNCounter]) <= 10340 and int(
                                UniqueSerialNumArray[SNCounter]) > 10000:
                            MAINtable_array_temp[0, 13] = 3
                        elif int(UniqueSerialNumArray[SNCounter]) > 10340 and int(
                                UniqueSerialNumArray[SNCounter]) < 11000:
                            MAINtable_array_temp[0, 13] = 1
                        elif int(UniqueSerialNumArray[SNCounter]) <= 15317 and int(
                                UniqueSerialNumArray[SNCounter]) > 15000:
                            MAINtable_array_temp[0, 13] = 3
                        elif int(UniqueSerialNumArray[SNCounter]) > 15317 and int(
                                UniqueSerialNumArray[SNCounter]) < 16000:
                            MAINtable_array_temp[0, 13] = 1
                        elif int(UniqueSerialNumArray[SNCounter]) >= 19001 and int(
                                UniqueSerialNumArray[SNCounter]) < 20000:
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
                              "Intermittent", "Reason(s) for flag", "Priority",
                              "Known Top Message - Recommended Documents",
                              "MHIRJ ISE Recommendation", "Additional Comments", "MHIRJ ISE Input"]

        # Converts the Numpy Array to Dataframe to manipulate
        # pd.set_option('display.max_rows', None)
        # Main table
        #global OutputTableHistory
        OutputTableHistory = pd.DataFrame(data=MAINtable_array, columns=TitlesArrayHistory).fillna(" ").sort_values(
            by=["Type", "Priority"])
        HistoryReport =OutputTableHistory

        # create a flags report
        #Flagsreport = 1  # this is here to initialize the variable. user must start report by choosing Newreport = True

        #def Toreport(Flagsreport, AircraftSN, Bcode, newreport=False, HistoryReport=OutputTableHistory):
        '''Populates a report with input from the previous report, aircraft serial number and B1 message code'''
        # if the user wants a brand new report
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
        counts = pd.DataFrame(data=DatesDF.groupby(['Aircraft', "Equation ID", "DateAndTime"]).agg(len),
                              columns=["Counts"])
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

        Flagsreport_json = Flagsreport.to_json(orient='records')
        return Flagsreport_json







# Plots
## Chart 1
def connect_database_for_chart1(n, aircraft_no, from_dt, to_dt):
    sql = "SELECT TOP "+str(n)+" Count(MDCMessagesInputs.Message), Airline_MDC_Data. Equation_ID, MDCMessagesInputs.Message, MDCMessagesInputs.EICAS, Airline_MDC_Data.LRU, Airline_MDC_Data.ATA FROM Airline_MDC_Data INNER JOIN MDCMessagesInputs ON Airline_MDC_Data.ATA = MDCMessagesInputs.ATA WHERE Airline_MDC_Data.aircraftno = "+str(aircraft_no)+" AND Airline_MDC_Data.DateAndTime BETWEEN '"+from_dt+"' AND '"+to_dt+"' GROUP BY Airline_MDC_Data.Equation_ID, MDCMessagesInputs.Message, MDCMessagesInputs.EICAS, Airline_MDC_Data.LRU, Airline_MDC_Data.ATA ORDER BY Count(MDCMessagesInputs.Message) DESC"

    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        chart1_sql_df = pd.read_sql(sql, conn)
        #MDCdataDF.columns = column_names
        return chart1_sql_df
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + str(err))



@app.post("/chart_one/{top_n}/{aircraftNo}/{fromDate}/{toDate}")
async def get_ChartOneData(top_n:int, aircraftNo:int, fromDate: str , toDate: str):
    chart1_sql_df = connect_database_for_chart1(top_n, aircraftNo, fromDate, toDate)
    chart1_sql_df_json = chart1_sql_df.to_json(orient='records')
    return chart1_sql_df_json

## Chart 2
def connect_database_for_chart2(n, ata, from_dt, to_dt):
    if len(ata) == 2:
        sql = "SELECT TOP "+str(n)+" COUNT(ATA_Main), aircraft FROM Airline_MDC_Data where ATA_Main='"+ata+"' AND DateAndTime BETWEEN '"+from_dt+"' AND '"+to_dt+"' GROUP BY ATA_Main, Aircraft ORDER BY COUNT(ATA_Main) DESC"
    elif len(ata) == 5:
        sql = "SELECT TOP "+str(n)+" COUNT(ATA), aircraft FROM Airline_MDC_Data where ATA='"+ata+"' AND DateAndTime BETWEEN '"+from_dt+"' AND '"+to_dt+"' GROUP BY ATA, Aircraft ORDER BY COUNT(ATA) DESC"

    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        chart2_sql_df = pd.read_sql(sql, conn)
        # MDCdataDF.columns = column_names
        return chart2_sql_df
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + str(err))

@app.post("/chart_two/{top_values}/{ata}/{fromDate}/{toDate}")
async def get_ChartwoData(top_values:int, ata:str, fromDate: str , toDate: str):
    chart2_sql_df = connect_database_for_chart2(top_values, ata, fromDate, toDate)
    chart2_sql_df_json = chart2_sql_df.to_json(orient='records')
    return chart2_sql_df_json


## Chart 3
def connect_database_for_chart3(aircraft_no, equation_id, is_flight_phase_enabled, from_dt, to_dt):
    if is_flight_phase_enabled == 0: # Flight phase is NOT enabled
        sql = "SELECT COUNT(*) AS OccurencesPerDay, cast(DateAndTime as date) AS Dates from Airline_MDC_Data WHERE Equation_ID='"+equation_id+"' AND aircraftno = '"+str(aircraft_no)+"' AND Flight_Phase IS NOT NULL AND DateAndTime BETWEEN '"+from_dt+"' AND '"+to_dt+"' GROUP BY cast(DateAndTime as date)"
    elif is_flight_phase_enabled == 1:
        sql = "SELECT COUNT(*) AS OccurencesPerDay, cast(DateAndTime as date) AS Dates from Airline_MDC_Data WHERE Equation_ID='"+equation_id+"' AND aircraftno = '"+str(aircraft_no)+"' AND Flight_Phase IS NULL AND DateAndTime BETWEEN '"+from_dt+"' AND '"+to_dt+"' GROUP BY cast(DateAndTime as date)"

    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        chart3_sql_df = pd.read_sql(sql, conn)
        # MDCdataDF.columns = column_names
        return chart3_sql_df
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + str(err))

@app.post("/chart_three/{aircraft_no}/{equation_id}/{is_flight_phase_enabled}/{fromDate}/{toDate}")
async def get_CharThreeData(aircraft_no:int, equation_id:str, is_flight_phase_enabled:int, fromDate: str , toDate: str):
    chart3_sql_df = connect_database_for_chart3(aircraft_no, equation_id, is_flight_phase_enabled, fromDate, toDate)
    chart3_sql_df_json = chart3_sql_df.to_json(orient='records')
    return chart3_sql_df_json


## Chart 5
def connect_database_for_chart5(aircraft_no, equation_id, is_flight_phase_enabled, from_dt, to_dt):
    if is_flight_phase_enabled == 0: # Flight phase is NOT enabled
        sql = "SELECT COUNT(Intermittent) AS OccurencesOfIntermittent, Flight_Leg_No FROM Airline_MDC_Data  WHERE Equation_ID='"+equation_id+"' AND aircraftno = '"+str(aircraft_no)+"' AND Flight_Phase IS NOT NULL AND DateAndTime BETWEEN '"+from_dt+"' AND '"+to_dt+"' GROUP BY Flight_Leg_No"
    elif is_flight_phase_enabled == 1:
        sql = "SELECT COUNT(Intermittent) AS OccurencesOfIntermittent, Flight_Leg_No FROM Airline_MDC_Data  WHERE Equation_ID='"+equation_id+"' AND aircraftno = '"+str(aircraft_no)+"' AND Flight_Phase IS NULL AND DateAndTime BETWEEN '"+from_dt+"' AND '"+to_dt+"' GROUP BY Flight_Leg_No"

    try:
        conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                              user='mhirj-admin', password='KaranCool123')
        chart5_sql_df = pd.read_sql(sql, conn)
        # MDCdataDF.columns = column_names
        return chart5_sql_df
    except pyodbc.Error as err:
        print("Couldn't connect to Server")
        print("Error message:- " + str(err))

@app.post("/chart_five/{aircraft_no}/{equation_id}/{is_flight_phase_enabled}/{fromDate}/{toDate}")
async def get_CharFiveData(aircraft_no:int, equation_id:str, is_flight_phase_enabled:int, fromDate: str , toDate: str):
    chart5_sql_df = connect_database_for_chart5(aircraft_no, equation_id, is_flight_phase_enabled, fromDate, toDate)
    chart5_sql_df_json = chart5_sql_df.to_json(orient='records')
    return chart5_sql_df_json