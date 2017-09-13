# Adding Spree E-commerce to an existing Rails application that uses Devise and a custom User model

These steps document this process for my own records, but anyone is welcome to use them. I've taken these steps from a few places:

1) [Spree Docs Getting Started](http://guides.spreecommerce.org/developer/getting_started_tutorial.html)
2) [Spree Docs Custom Auth](http://guides.spreecommerce.org/developer/authentication.html)
3) [Devise Docs](https://github.com/plataformatec/devise)

```bash
cd <YOUR_AWESOME_RAILS_APP>
cat "gem 'spree', '~> 3.3.0'" > Gemfile
cat "gem 'spree_gateway', '~> 3.3'" > Gemfile
bundle install
rails g spree:install --user_class=User
rails g spree:custom_user User
```

At this point it's time to customize our routes so Spree knows how to login and out. Open `config/routes.rb` and add:

```ruby
devise_scope :person do
  get '/login', to: "devise/sessions#new"
  get '/signup', to: "devise/registrations#new"
  delete '/logout', to: "devise/sessions#destroy"
end
```

Finally I went back to finish the gateway install:

```bash
bundle exec rails g spree_gateway:install
```
