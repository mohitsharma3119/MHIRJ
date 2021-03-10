import pyodbc
import pandas as pd


hostname="mhirjserver.database.windows.net"
db_name="MHIRJ"
username="mhirj-admin"
password="KaranCool123"

try:
    conn = pyodbc.connect(driver='{SQL Server}', host='mhirjserver.database.windows.net', database='MHIRJ',
                       user='mhirj-admin', password='KaranCool123')
except pyodbc.Error as err:
    print("Couldn't connect to Server")
    print("Error message:- "+err)

cursor = conn.cursor()
sql_stmt2 = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'Airline_MDC_Data'"
sql_stmt = 'SELECT top(10) * FROM Airline_MDC_Data'
ans = cursor.execute(sql_stmt)


df = pd.DataFrame((tuple(t) for t in ans), columns = ["Aircraft", "Tail", "Flight_Leg_No",
                                                      "ATA_Main","ATA_Sub","ATA","ATA_Description","LRU",
                                                      "DateAndTime","MDC_Message","Status","Flight_Phase","Type",
                                                      "Intermittent","Equation_ID","Source","Diagnostic_Data",
                                                      "Data_Used_to_Determine_Msg","ID","Flight","airline_id","aircraftno"])

print(df.columns)
print(df.shape)
print(df.head(10))

'''
#datatobeanalyzed_df = pd.read_sql_query(sql_stmt, conn)
records = cursor.fetchall()
for rec in records:
    print(rec)
'''