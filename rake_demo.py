# Reka
import RAKE
import operator

myfile = "words.txt"
rake_object = RAKE.Rake(myfile)

# Sample text to test RAKE
text = """Google quietly rolled out a new way for Android users to listen 
#to podcasts and subscribe to shows they like, and it already works on 
#your phone. Podcast production company Pacific Content got the exclusive 
#on it.This text is taken from Google news."""

#text = "spoiler splr"

# Extract keywords
keywords = rake_object.run(text)
print ("keywords: ", keywords)