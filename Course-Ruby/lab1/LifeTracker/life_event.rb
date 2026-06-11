# life_event.rb
# Responsibility: carry the data for a single logged event.
# This class knows nothing about how the event is displayed or stored.
# It is a plain data object — sometimes called a "value object".

class LifeEvent
  # attr_reader creates getter methods for each field (read-only from outside)
  attr_reader :type, :description, :duration, :timestamp

  def initialize(type, description, duration)
    @type        = type                # e.g. "STUDY", "WORK", "EXERCISE", "MEAL"
    @description = description        # e.g. "Deep work on Ruby SOLID principles"
    @duration    = duration            # integer — number of minutes
    @timestamp   = Time.now           # captured automatically at creation time
  end

  # A human-readable string representation of the event.
  # Used by ConsoleHandler and FileHandler to format their output.
  def to_s
    "[#{@timestamp.strftime('%Y-%m-%d %H:%M')}] #{@type} — #{@description} (#{@duration} min)"
  end
end
