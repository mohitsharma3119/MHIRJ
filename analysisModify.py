def connect_database_MDCdata(ata, excl_eqid, airline_operator, include_current_message, from_dt, to_dt):
    global MDCdataDF
    global airline_id
    #ata_list = tuple(ata)
    #excl_eqid_list = tuple(excl_eqid)
    #for each_ata in ata:
    #    print(each_ata)
    if airline_operator.upper() == "SKW":
        print(airline_operator.upper())
        airline_id = 101

    if ata == "ALL":
        sql = "SELECT * FROM Airline_MDC_Data WHERE  Equation_ID NOT IN " + str(
            excl_eqid) + " AND airline_id = " + str(
            airline_id) + " AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
    else:
        sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(ata) + " AND Equation_ID NOT IN " + str(
            excl_eqid) + " AND airline_id = " + str(
            airline_id) + " AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"

    if excl_eqid == "All":
        sql = "SELECT "Aircraft", "Tail", "Flight_Leg_No",
               "ATA_Main", "ATA_Sub", "ATA", "ATA_Description", "LRU",
               "DateAndTime", "MDC_Message", "Status", "Flight_Phase", "Type",
               "Intermittent","Source", "Diagnostic_Data",
               "Data_Used_to_Determine_Msg" , "ID", "Flight", "airline_id", "aircraftno" "FROM Airline_MDC_Data WHERE ATA_Main IN " + str(ata) + " AND airline_id = " + str(
            airline_id) + " AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
    else:
        sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(ata) + " AND Equation_ID NOT IN " + str(
            excl_eqid) + " AND airline_id = " + str(
            airline_id) + " AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'


    if include_current_message == 0:    # If we do not include current message
        sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(ata) + " AND Equation_ID NOT IN " + str(
            excl_eqid) + " AND airline_id = " + str(
            airline_id) + " AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"
    elif include_current_message == 1:
        sql = "SELECT * FROM Airline_MDC_Data WHERE ATA_Main IN " + str(ata) + " AND Equation_ID NOT IN " + str(
            excl_eqid) + " AND airline_id = " + str(
            airline_id) + " AND flight_phase IS NULL AND DateAndTime BETWEEN '" + from_dt + "' AND '" + to_dt + "'"

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
