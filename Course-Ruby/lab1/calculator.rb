sum = 0
average = 0
letter_grade = ""
highest_score = 0
lowest_score = 100
puts("How many scores?")
number_of_scores = gets.chomp.to_i
number_of_scores.times do
    puts("Enter score:")
    score = gets.chomp.to_f
    sum += score
    if score > highest_score
        highest_score = score
    end
    if score < lowest_score
        lowest_score = score
    end 
end
average= sum/number_of_scores
if average >= 90
    letter_grade = "A"
elsif average >= 80
    letter_grade = "B"
elsif average >= 70
    letter_grade = "C"
elsif average >= 60
    letter_grade = "D"
else
    letter_grade = "F"
end
puts("Results:")
puts("Average: #{average}")
puts("Grade: #{letter_grade}")
puts("Highest: #{highest_score}")
puts("Lowest: #{lowest_score}")

