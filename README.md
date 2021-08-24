# Social Media API

You are tasked with developing a social media application which can be used to share information with other people. This application will only be used by people that work in a certain company so we cannot use existing public social media.

## Getting Started

### Prerequisites

- Ruby 3.01
- Bundler 2.2.18

### Clone repository

```
git clone https://github.com/umar006/social-media-api.git
cd social-media-api
```

### Migration database

Create database with name 'social_media_api', then
```
mysql social_media_api < social_media_api.sql
```

### Install dependencies

```
bundle install
```

### Running the test

```
rspec
```
### Check coverage code
Mac terminal
```
open coverage/index.html
```
Ubuntu terminal
```
xdg-open coverage/index.html
```

### Running the server

```
rackup config.ru
```
