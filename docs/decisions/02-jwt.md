# Authentication - JWT

## Context and Problem Statement

Users and admins have to authenticate themselves every time they open the app. In order to make it easier for them, there needs to be easier access for users who recently logged in.

## Considered Options

* JWT (JSON Web Token)
* Session
* OAuth2
* Hybrid approach

## Decision Outcome

Only using **JWT** for our authentication, was chosen for this project, since there is no need for synchronization or offloading to a third party. The tokens are stored locally and verified when trying to access resources.

### Consequences

* Good, because it was easy to implement and works for our use case.
* Good, because I was able to add additional information to the token (role), for ressource authorization
* Bad, because the entire data security is dependent on this simple implementation of JWT tokens. If say the JWT secret is leaked, all hell breaks loose.
