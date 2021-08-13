# Pipedrive Wrapper

Add new functionality to the official package. In the list you can find extensions the wrapper brought.

### OrganizationsController

```javascript
findOrCreateOrganization(input, callback)
```

Find or create an organization.

|Parameter      |Tags         |Description
|---------------|-------------|-----------
|input.body     |`Required`   |An organization data the same as for rest of `OrganizationsController`
|input.params   |`Required`   |Item search parameters the same as for rest of `ItemsController`

Return a promise with a not modified response.


```javascript
findAndSaveOrganization(input, callback)
```

Find or create and update a founded organization.

|Parameter      |Tags         |Description
|---------------|-------------|-----------
|input.body     |`Required`   |An organization data the same as for rest of `OrganizationsController`
|input.params   |`Required`   |Item search parameters the same as for rest of `ItemsController`

Return a promise with a not modified response.

### PersonsController

```javascript
findOrCreatePerson(input, callback)
```

Find or create a person.

|Parameter      |Tags         |Description
|---------------|-------------|-----------
|input.body     |`Required`   |A person data the same as for rest of `PersonsController`
|input.params   |`Required`   |Item search parameters the same as for rest of `ItemsController`

Return a promise with a not modified response.


```javascript
findAndSavePerson(input, callback)
```

Find or create and update a founded person.

|Parameter      |Tags         |Description
|---------------|-------------|-----------
|input.body     |`Required`   |A person data the same as for rest of `PersonsController`
|input.params   |`Required`   |Item search parameters the same as for rest of `ItemsController`

Return a promise with a not modified response.

### DealsController

```javascript
findOrCreateDeal(input, callback)
```

Find or create a deal.

|Parameter      |Tags         |Description
|---------------|-------------|-----------
|input.body     |`Required`   |A deal data the same as for rest of `DealsController`
|input.params   |`Required`   |Item search parameters the same as for rest of `ItemsController`

Return a promise with a not modified response.


```javascript
findAndSaveDeal(input, callback)
```

Find or create and update a founded deal.

|Parameter      |Tags         |Description
|---------------|-------------|-----------
|input.body     |`Required`   |A deal data the same as for rest of `DealsController`
|input.params   |`Required`   |Item search parameters the same as for rest of `ItemsController`

Return a promise with a not modified response.

### ProductsController

```javascript
findOrCreateProduct(input, callback)
```

Find or create a product.

|Parameter      |Tags         |Description
|---------------|-------------|-----------
|input.body     |`Required`   |A product data the same as for rest of `ProductsController`
|input.params   |`Required`   |Item search parameters the same as for rest of `ItemsController`

Return a promise with a not modified response.


```javascript
findAndSaveProduct(input, callback)
```

Find or create and update a founded product.

|Parameter      |Tags         |Description
|---------------|-------------|-----------
|input.body     |`Required`   |A product data the same as for rest of `ProductsController`
|input.params   |`Required`   |Item search parameters the same as for rest of `ItemsController`

Return a promise with a not modified response.

### PaginationController

```javascript
all(fn, input, callback)
```

Paginate and return all records.

|Parameter      |Tags         |Description
|---------------|-------------|-----------
|fn             |`Required`   |A method that should be paginated e.g. `PersonsController.getAllPersons`
|input          |`Optional`   |An input data for the paginated method
|callback       |`Optional`   |A callback

Return a promise with a single connected array.

## Models

Some models were modified cause an original package returned a null mapped response.

### Product

```
[
  { name: 'success', realName: 'success' },
  { name: 'data', realName: 'data', array: true },
]
```
