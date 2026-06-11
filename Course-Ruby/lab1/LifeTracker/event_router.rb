# event_router.rb
# Responsibility: receive a dispatched event and notify all registered handlers.
# This class NEVER mentions ConsoleHandler, FileHandler, or MysqlHandler by name.
# It only knows about the Handler interface.
#
# SOLID connection:
#   - (S) Single Responsibility: one job — dispatch events to handlers
#   - (O) Open/Closed: adding a new handler requires zero changes here
#   - (D) Dependency Inversion: depends on the Handler abstraction, never on concrete classes
#
# Design Pattern: Observer
#   - EventRouter = the "subject" / publisher
#   - Each Handler = a "subscriber" / observer

require_relative 'handler'

class EventRouter
  def initialize
    @handlers = []   # will hold any object that inherits from Handler
  end

  # Register a handler — the router doesn't care what kind, only that it IS a Handler
  def register(handler)
    unless handler.is_a?(Handler)
      raise ArgumentError, "#{handler.class.name} must inherit from Handler"
    end
    @handlers << handler
  end

  # Dispatch fires every registered handler simultaneously (sequentially in Ruby)
  # Notice: no concrete class name appears anywhere in this method
  def dispatch(event)
    @handlers.each { |handler| handler.handle(event) }
  end
end
