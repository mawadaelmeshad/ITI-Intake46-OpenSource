# console_handler.rb
# Responsibility: print a logged event to the terminal. That is ALL it does.
# It has no knowledge of files, databases, or any other handler.
#
# SOLID connection:
#   - (S) Single Responsibility: one job — print to terminal
#   - (L) Liskov Substitution: inherits from Handler, so it's interchangeable with any other handler
#   - (O) Open/Closed: adding a new handler never requires touching this file

require_relative 'handler'

class ConsoleHandler < Handler
  def handle(event)
    puts "\n#{event}"          # calls event.to_s automatically
    puts "✓ Event logged."
  end
end
