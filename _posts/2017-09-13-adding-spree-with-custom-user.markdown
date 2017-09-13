# Adding Spree E-commerce to an existing Rails application that uses Devise and a custom User model

These steps document this process for my own records, but anyone is welcome to use them. I've taken these steps from a few places:

1) [Spree Docs Getting Started](http://guides.spreecommerce.org/developer/getting_started_tutorial.html)
2) [Spree Docs Custom Auth](http://guides.spreecommerce.org/developer/authentication.html)
3) [Devise Docs](https://github.com/plataformatec/devise)

```bash
cd <YOUR_AWESOME_RAILS_APP>
cat "gem 'spree', '~> 3.3.0'" > Gemfile
bundle install
bin/rails generate spree:install --user-class=User --no-sample --no-migrate --no-seed
bin/rails g spree:custom_user User
bin/rails db:migrate
```

At this point it's time to customize our routes so Spree knows how to login and out. Open `config/routes.rb` and add:

```ruby
devise_scope :person do
  get '/login', to: "devise/sessions#new"
  get '/signup', to: "devise/registrations#new"
  delete '/logout', to: "devise/sessions#destroy"
end
```

As well, for your custom `User` class to work you need to include some of the expected methods and relations by including some modules from Spree in your class definition. If you don't do this you'll find your missing many of the methods required for Spree to work properly (`spree_roles`, `has_spree_role?`, `orders`, `last_incomplete_spree_order`, etc.). For example,

```ruby
class User < ApplicationRecord
  include Spree::UserAddress
  include Spree::UserMethods
  include Spree::UserPaymentSource
  include Spree::UserReporting
  
  <YOUR CLASS WOULD CONTINUE HERE>
end
```

Finally I went back to finish the gateway install:

```bash
cat "gem 'spree_gateway', '~> 3.3'" > Gemfile
bundle install
bundle exec rails g spree_gateway:install
```
