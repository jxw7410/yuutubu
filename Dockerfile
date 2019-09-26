FROM ruby:2.5.1

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update -yqq \
    && apt-get install -yqq --no-install-recommends \
        postgresql-client \
        nodejs \
    && apt-get -q clean \
    && rm -rf /var/lib/apt/lists

RUN mkdir /usr/src/app
WORKDIR /usr/src/app 

COPY Gemfile* ./
ENV BUNDLER_VERSION 2.0.2
RUN gem install bundler && bundler -v 
RUN bundle install

COPY package*.json ./
RUN npm install
COPY . .
