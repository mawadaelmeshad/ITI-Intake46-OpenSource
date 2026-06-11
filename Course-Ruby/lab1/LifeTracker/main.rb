# main.rb
# Responsibility: present the menu, collect user input, create events, and dispatch them.
# This is the ONLY file that names concrete handler classes.
# The router and all handlers are wired together here — this is the "composition root".
#
# SOLID connection:
#   - (S) Single Responsibility: entry-point wiring and menu loop
#   - (O) Open/Closed: adding a new handler means adding ONE require + ONE register line here
#   - (D) The router itself never names concrete classes — only this file does

require_relative 'life_event'
require_relative 'event_router'
require_relative 'console_handler'
require_relative 'file_handler'
require_relative 'stats_handler'

# ── Wire up the router with all three outputs ─────────────────────────────────
router = EventRouter.new
router.register(ConsoleHandler.new)
router.register(FileHandler.new('life_log.txt'))
router.register(StatsHandler.new)
# To add a 4th output: require it above, register it here. Touch nothing else.

# ── Event type menu map ───────────────────────────────────────────────────────
EVENT_TYPES = {
  "1" => "WORK",
  "2" => "STUDY",
  "3" => "EXERCISE",
  "4" => "MEAL"
}.freeze

# ── Menu loop ─────────────────────────────────────────────────────────────────
loop do
  puts "\n=== LifeTrack ==="
  puts "1. Log a work session"
  puts "2. Log a study session"
  puts "3. Log an exercise session"
  puts "4. Log a meal"
  puts "5. Exit"
  print "\nChoose an option: "

  choice = gets.chomp

  break if choice == "5"   # exit the loop → at_exit fires → StatsHandler prints summary

  unless EVENT_TYPES.key?(choice)
    puts "Invalid option. Please choose 1–5."
    next
  end

  print "Description: "
  description = gets.chomp

  print "Duration (minutes): "
  duration = gets.chomp.to_i

  # Create the event — timestamp is set automatically inside LifeEvent
  event = LifeEvent.new(EVENT_TYPES[choice], description, duration)

  # Dispatch to ALL registered handlers simultaneously — router handles the rest
  router.dispatch(event)
end

puts "\nGoodbye! 👋"
