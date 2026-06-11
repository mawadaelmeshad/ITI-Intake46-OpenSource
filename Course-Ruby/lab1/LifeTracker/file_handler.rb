# file_handler.rb
# Responsibility: append a logged event to a text file. That is ALL it does.
# It has no knowledge of the terminal, databases, or any other handler.
#
# SOLID connection:
#   - (S) Single Responsibility: one job — write to file
#   - (L) Liskov Substitution: interchangeable with any other Handler subclass

require_relative 'handler'

class FileHandler < Handler
  def initialize(filepath = 'life_log.txt')
    @filepath = filepath   # injectable path — makes this easy to test with a different file
  end

  def handle(event)
    # File.open with "a" = append mode — adds to the end, never overwrites existing content
    File.open(@filepath, 'a') do |file|
      file.puts event.to_s   # writes the same formatted string ConsoleHandler prints
    end
  end
end
