# handler.rb
# Responsibility: define the contract that every output handler must follow.
# This is Ruby's way of simulating an abstract base class / interface.
#
# SOLID connection:
#   - (I) Interface Segregation: exactly ONE method in this interface
#   - (D) Dependency Inversion: EventRouter depends on THIS class, never on concrete handlers
#   - (L) Liskov Substitution: any subclass can replace any other — they all respond to handle()

class Handler
  # Every subclass MUST implement this method.
  # If they forget, Ruby will raise NotImplementedError at runtime — loudly, not silently.
  def handle(event)
    raise NotImplementedError, "#{self.class.name} must implement the handle(event) method"
  end
end
