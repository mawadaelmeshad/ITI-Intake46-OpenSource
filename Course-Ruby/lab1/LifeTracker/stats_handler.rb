# stats_handler.rb
# Responsibility: count how many events of each type were logged in this session,
# then print a summary automatically when the program exits.
#
# The menu loop NEVER calls print_summary — it fires via Ruby's at_exit hook.
# This satisfies the lab constraint: "Must fire automatically on exit — the menu loop must not call it"
#
# SOLID connection:
#   - (S) Single Responsibility: one job — track counts and report them on exit
#   - (O) Open/Closed: added as a new file; zero existing files were modified
#   - (L) Liskov Substitution: interchangeable with any other Handler subclass

require_relative 'handler'

class StatsHandler < Handler
  def initialize
    @counts = Hash.new(0)   # default value of 0 for any new key — no need to check if key exists

    # at_exit runs automatically when the Ruby process is about to quit.
    # We capture `self` so the block can call our print_summary method.
    this = self
    at_exit { this.print_summary }
  end

  # Called by EventRouter for every dispatched event
  def handle(event)
    @counts[event.type] += 1   # increment the counter for this event type
  end

  # Called automatically by at_exit — NOT by the menu loop
  def print_summary
    return if @counts.empty?   # nothing to show if no events were logged

    puts "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    puts "  📊 Session Summary"
    puts "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    @counts.each do |type, count|
      puts "  #{type.ljust(10)} → #{count} event#{"s" if count != 1}"
    end
    puts "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
  end
end
