from fuzzywuzzy import fuzz 
from fuzzywuzzy import process 
  
s1 = "I love GeeksforGeeks"
s2 = "I am loving GeeksforGeeks"
print("FuzzyWuzzy Ratio: ", fuzz.ratio(s1, s2)) 
print("FuzzyWuzzy PartialRatio: ", fuzz.partial_ratio(s1, s2)) 
print("FuzzyWuzzy TokenSortRatio: ", fuzz.token_sort_ratio(s1, s2)) 
print("FuzzyWuzzy TokenSetRatio: ", fuzz.token_set_ratio(s1, s2) )
print("FuzzyWuzzy WRatio: ", fuzz.WRatio(s1, s2),'\n\n')
  
# for process library, 
query = 'geeks for geeks'
choices = ['geek for geek', 'geek geek', 'g. for geeks']  
print("List of ratios: ")
print(process.extract(query, choices), '\n')
print("Best among the above list: ",process.extractOne(query, choices))

# from fuzzywuzzy import process
# str2Match = "apple inc"
# strOptions = ["Apple Inc.","apple park","apple incorporated","iphone"]
# Ratios = process.extract(str2Match,strOptions)
# print(Ratios)
# # You can also select the string with the highest matching percentage
# highest = process.extractOne(str2Match,strOptions)
# print(highest)