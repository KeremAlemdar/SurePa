import pandas as pd
import re
import xlsxwriter
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('./service.json')
firebase_admin.initialize_app(cred)

db = firestore.client()



df1 = pd.read_excel (r'C:\Users\Kerem\PycharmProjects\AddMedicinesToDatabase\ilaclar.xlsx')
workbook = xlsxwriter.Workbook(r'C:\Users\Kerem\PycharmProjects\AddMedicinesToDatabase\ayrilmis.xlsx')
worksheet = workbook.add_worksheet()
isimler = []
#print(df1.columns.ravel())
ilacIsimleri = df1['Ilac Adi'].tolist()
barkod = df1['Barkod'].tolist()
atcAdi = df1['ATC Adi'].tolist()

worksheet.write(0, 0, "Ilac Adi")
worksheet.write(0, 1, "Miligram")
worksheet.write(0, 2, "Tablet")
worksheet.write(0, 3, "Kapsul")
worksheet.write(0, 4, "Ampul")
worksheet.write(0, 5, "Mililitre")
worksheet.write(0, 6, "Gram")

count = 0
currentCount = 0
dozeCount = 0
previousItemName = ""
for i in ilacIsimleri:
    print(i)
    hasMiligram = False
    MG = 0
    hasTablet = False
    Tablet = 0
    hasFilm = False
    Film = 0
    hasKapsul = False
    Kapsul = 0
    hasAmpul = False
    Ampul = 0
    hasMililiter = False
    ML = 0
    hasGram = False
    Gram = 0

    #newArr = i.split()
    a = re.sub(r'(\d+)', '\n\\1', i)
    b = a.split("\n")
    hasPercentage = False
    startingIndex = 0
   # print(b)
    if "%" in b[0][0:len(b[0])-2]:
        hasPercentage = True
        startingIndex = 1

    myName = b[startingIndex][0:len(b[startingIndex])-2] if '%' in b[startingIndex][len(b[startingIndex])-2:len(b[startingIndex])] else b[startingIndex]
    myName = myName[0:len(myName)-2] if '(' in myName else myName

    isimler.append(myName)

    #print(b)
    #print(b[0])
    for j in b:
        #print(j.split()[0])
        if "MG" in j:
            hasMiligram = True
            MG = j.split()[0]
        if "TABLET" in j:
            hasTablet = True
            Tablet = j.split()[0]
        if "KAPSUL" in j:
            hasKapsul = True
            Kapsul = j.split()[0]
        if "AMPUL" in j:
            hasAmpul = True
            Ampul = j.split()[0]
        if "ML " in j:
            hasMililiter = True
            ML = j.split('ML')[0]
        if "GRAM" in j:
            hasGram = True
            Gram = j.split()[0]
    count = count + 1

    myData = myName
    # MILIGRAM 1
    # TABLET 2
    # KAPSUL 3
    # AMPUL 4
    # MILILITRE 5
    # GRAM 6
    try:
        MG = int(MG)
    except:
        MG = 0
    try:
        Tablet = int(Tablet)
    except:
        Tablet = 0
    try:
        Kapsul = int(Kapsul)
    except:
        Kapsul = 0
    try:
        Ampul = int(Ampul)
    except:
        Ampul = 0
    try:
        ML = int(ML)
    except:
        ML = 0
    try:
        Gram = int(Gram)
    except:
        Gram = 0
    string = "dose"
    x = str(myName)
    print(x)
    doc_ref = db.collection(u'medicines').document(str(currentCount))
    doc_ref.set({
        u'Medicine_name': myName
    })
    doc_ref = db.collection(u'medicines').document(str(currentCount)).collection(str(dozeCount)).document(string)
    doc_ref.set({
        u'MG': MG,
        u'Tablet': Tablet,
        u'Kapsul': Kapsul,
        u'Ampul': Ampul,
        u'ML': ML,
        u'Gram': Gram,
    })
    worksheet.write(count, 0, myName)
    worksheet.write(count, 1, MG)
    worksheet.write(count, 2, Tablet)
    worksheet.write(count, 3, Kapsul)
    worksheet.write(count, 4, Ampul)
    worksheet.write(count, 5, ML)
    worksheet.write(count, 6, Gram)

    dozeCount = dozeCount+1
    if previousItemName != myName:
        currentCount = currentCount+1
        dozeCount = 0
workbook.close()

#print(isimler)
#import xlrd
#loc = (r"C:\Users\Kerem\PycharmProjects\AddMedicinesToDatabase\deneme.xlsx")
#wb = xlrd.open_workbook(loc)
#sheet = wb.sheet_by_name("İlaç Adı")
#print(sheet)