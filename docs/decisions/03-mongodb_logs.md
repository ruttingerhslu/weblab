# MongoDB logs

## Context and Problem Statement

As described in the quality requirements: all logins to the Technology Radar administration view are to be recorded.

## Considered Options

* Morgan
* Winston
* Storing logs as entries in DB

## Decision Outcome

*Storing logs as entries in DB* was chosen for this project, since it is easiest to implement (just adding another route), and doesn't require any more additional packages or libraries.

### Consequences

* Good, because I could easily implement it without losing data integrity or having to remodel the entire system.
* Good, because I was able to set an expiry date of 90 days.
* Bad, because it clutters up the MongoDB with saving all logins.
