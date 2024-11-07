# HTD Dev Squad Proposal

# Public Restroom Finder Plan (Detailed)

## High-Level Requirements

The app will serve as a public restroom locator for users, allowing them to easily find nearby restrooms, leave reviews, and access key information.

- **Add a Restroom**: Users can add a new restroom location to the system.
- **Update Restroom Details**: Users can update information about existing restrooms.
- **Remove a Restroom**: Users can delete a restroom location if it's no longer available or relevant.
- **Display Nearby Restrooms**: Users can view a list of restrooms near their current location or a specified area.
- **Leave Reviews**: Users can leave written reviews and rate restrooms based on their experience.

## Restroom Data

### Data

Each restroom entry will include the following data:

- **Location Name**: A name or label to identify the restroom’s location (e.g., "Main Street Park Restroom").
- **Address**: The street address or description of the restroom’s physical location.
- **Latitude** and **Longitude**: Geographic coordinates to locate the restroom accurately on a map.
- **Opening Hours**: The times the restroom is available (e.g., "8 AM - 8 PM").
- **Reviews**: User-submitted written reviews about their experience at the restroom.
- **Directions**: Additional instructions or guidance on how to find the restroom (e.g., "Turn right after the playground").
- **Description**: A detailed description of the restroom, such as its condition, history, or notable features (e.g., "Newly renovated, with modern fixtures and high cleanliness standards").

### Review Data

- **Rating**: A numerical rating from 1 to 5 to indicate the quality of the restroom.
- **Review Text**: A written comment from the user detailing their experience with the restroom.
- **Timestamp**: The time the review was submitted.
- **Date Used**: The date when the restroom was last used by the reviewer (e.g., "2024-11-07").

### Amenities Data (Separate Table)

- **Amenity Name**: The name of the amenity (e.g., "Handicap Accessible," "Baby Changing Station," "Soap Dispenser").

### Relationship: Many-to-Many between Restrooms and Amenities

- A **Restroom** can have multiple **Amenities**, and an **Amenity** can be available at multiple **Restrooms**. 
- A junction table (e.g., **Restroom_Amenity**) will be used to model this relationship. The table will have:
  - **Restroom ID**: Foreign key to the **Restrooms** table.
  - **Amenity ID**: Foreign key to the **Amenities** table.

### Validation

To maintain data integrity and ensure usability, the following validation rules should apply:

- **Location Name** is required and cannot be blank.
- **Address** is required and must follow a standard address format.
- **Latitude** and **Longitude** are required and must be valid geographical coordinates.
- **Opening Hours** must be in a valid time range format.
- **Latitude** and **Longitude** values should be unique to avoid duplicate entries for the same location.
- **Review Rating** must be an integer between 1 and 5.
- **Review Text** must not be blank and should adhere to community guidelines.
- **Date Used**: Must be a valid date, representing when the restroom was last used by the reviewer (e.g., "YYYY-MM-DD"). This is important for tracking the timeliness of reviews and their relevance.
- **Amenities**: When adding or updating a restroom, the system should allow selecting one or more amenities from the available list.

## Technical Requirements

- **Architecture**: Implement a three-layer architecture (Controller, Service, Repository).
- **Data Storage**: Use a relational database (e.g., PostgreSQL or MySQL) to persist restroom and amenity data.
- **Many-to-Many Relationship**: Use a junction table (e.g., **Restroom_Amenity**) to handle the many-to-many relationship between restrooms and amenities.
- **Custom Exceptions**: Repositories should throw a custom exception for data access issues rather than generic database exceptions.
- **Testing**: Repository and service classes should be fully tested with positive and negative test cases. Test data should be isolated from production data.
- **Enums**: Define enums in Java for fields like **Review Rating**.
```
src
├───main
│   └───java
│       └───learn
│           └───toilet
│               │   App.java                      -- app entry point
│               │
│               ├───controllers
│               │       GlobalExceptionHandler.java
│               │       ErrorResponse.java  
│               │       UserController.java              
│               │       RestroomController.java  
│               │       ReviewController.java
│               │       AmenityController.java  
│               │       RestroomAmenityController.java          
│               ├───data
│               │       DataException.java        -- data layer custom exception
│               │       RestroomJdbcTemplateRepository.java  -- concrete repository
│               │       RestroomRepository.java      -- repository interface
│               │       ReviewJdbcTemplateRepository.java  -- concrete repository
│               │       ReviewRepository.java      -- repository interface
│               │       UserJdbcTemplateRepository.java  -- concrete repository
│               │       UserRepository.java      -- repository interface
│               │       AmenityJdbcTemplateRepository.java  -- concrete repository
│               │       AmenityRepository.java      -- repository interface
│               │       RestroomAmenityJdbcTemplateRepository.java  -- concrete repository
│               │       RestroomAmenityRepository.java      -- repository interface
│               │
│               ├───domain
│               │       Result.java          -- domain result for handling success/failure
│               │       ResultType.java         -- enum value for Result
│               │       RestroomService.java         -- restroom validation/rules
│               │       UserService.java         -- user validation/rules
│               │       ReviewService.java         -- review validation/rules
│               │       AmenityService.java         -- amenity validation/rules
│               │
│               └───models
│                       RestroomAmenity.java	-- restroom amenity model
│                       Review.java     -- review model
│                       User.java     -- user model
│                       Amenity.java     -- amenity model
│                       Restroom.java      -- restroom model
│
└───test
    └───java
        └───learn
            └───toilet
                ├───controllers
│               │       GlobalExceptionHandlerTest.java
│               │       UserControllerTest.java              
│               │       RestroomControllerTest.java  
│               │       ReviewControllerTest.java
│               │       AmenityControllerTest.java  
│               │       RestroomAmenityControllerTest.java    
                │
                ├───domain
│               │       RestroomServiceTest.java         
│               │       UserServiceTest.java         
│               │       ReviewServiceTest.java         
│               │       AmenityServiceTest.java
                └───data
│               │       RestroomJdbcTemplateRepositoryTest.java  
│               │       ReviewJdbcTemplateRepositoryTest.java  
│               │       UserJdbcTemplateRepositoryTest.java  
│               │       AmenityJdbcTemplateRepository.java
│               │       RestroomAmenityJdbcTemplateRepository.java 
```




## Class Details




### App
- `public static void main(String[])` -- instantiate all required classes with valid arguments, dependency injection. run controller




### data.DataException




Custom Data Exception




- `public DataException(String, Throwable)` – constructor, throwable is root cause




### models.Restroom
- `private int restroomId` -- primary key
- `private String locationName` -- A name or label to identify the restroom’s location (e.g., "Main Street Park Restroom")
- `private String address` -- The street address or description of the restroom’s physical location
- `private double latitude` -- Geographic coordinates to locate the restroom accurately on a map
- `private double longitude` -- Geographic coordinates to locate the restroom accurately on a map
- `private List<Review> reviews` -- User-submitted written reviews about their experience at the restroom.
- `private String directions` – Additional instructions or guidance on how to find the restroom (e.g., "Turn right after the playground")
- `private String description` -- A detailed description of the restroom, such as its condition, history, or notable features (e.g., "Newly renovated, with modern fixtures and high cleanliness standards").
- `public add(Restroom)`




### model.Review
- `private int reviewId` – Primary key
- `private int Rating` -- A numerical rating from 1 to 5 to indicate the quality of the restroom
- `private String ReviewText` -- A written comment from the user detailing their experience with the restroom.
- `private LocalDateTime timeStamp` -- The time the review was submitted
- `private Date used` -- The date when the restroom was last used by the reviewer (e.g., "2024-11-07").




### model.User
- `private int userId` -- A name or label to identify the restroom’s location (e.g., "Main Street Park Restroom")
- `private int Rating` -- A numerical rating from 1 to 5 to indicate the quality of the restroom
- `private String ReviewText` -- A written comment from the user detailing their experience with the restroom.
- `private LocalDateTime timeStamp` -- The time the review was submitted
- `private Date used` -- The date when the restroom was last used by the reviewer (e.g., "2024-11-07").


### model.Amenity
- `private int amenityId` -- amenity id
- `private String name` -- name for amenity


### models.RestroomAmenity
- `private int restroomId` -- restroom id
- `private Amenity amenity` -- amenity for that restroom




### data.RestroomJdbcTemplateRepository
- `private final JdbcTemplate jdbcTemplate`
- `public List<Restroom> findAll()` - finds all restrooms
- `public Restroom findById()` - finds a restroom by id
- `public Restroom add(Restroom)` - adds a restroom
- `public boolean update(Restroom)` - updates a restroom
- `public boolean deleteById(int)` - deletes a restroom by its id


### data.RestroomRepository (interface)


Contract for RestroomJdbTemplateRepository


- `public List<Restroom> findAll()`
- `public Restroom findById()`
- `public Restroom add(Restroom)`
- `public boolean update()`
- `public boolean deleteById()`




### data.ReviewJdbcTemplateRepository
- `private final JdbcTemplate jdbcTemplate`
- `public List<Review> findAll()` -- finds all reviews
- `public Review findById()` --finds review by its id
- `public Review add(Review)` -- adds a review
- `public boolean update(Review)` -- updates a review
- `public boolean deleteById(int)` -- deletes a review by its id


### data.ReviewRepository


Contract for ReviewJdbcTemplateRepository


- `public List<Review> findAll()`
- `public Review findById()`
- `public Review add(Review)`
- `public boolean update(Review)`
- `public boolean deleteById(int)`




### data.UserJdbcTemplateRepository
- `private final JdbcTemplate jdbcTemplate`
- `public List<User> findAll()` -- finds all users
- `public User findById()` -- finds user by its id
- `public User add(User)` -- adds a user
- `public boolean update(User)` -- updates a user
- `public boolean deleteById(int)` -- deletes a user by its id


### data.UserRepository


Contract for UserJdbcTemplateRepository


- `public List<User> findAll()`
- `public User findById()`
- `public User add(User)`
- `public boolean update(User)`
- `public boolean deleteById(int)`


### data.AmenityJdbcTemplateRepository
- `private final JdbcTemplate jdbcTemplate`
- `public List<Amenity> findAll()` -- finds all amenities
- `public Amenity findById()` -- finds amenity by the id
- `public Amenity add(Amenity)` -- adds an amenity
- `public boolean update(Amenity)` -- updates an amenity
- `public boolean deleteById(int)` -- deletes an amenity


### data.RestroomAmenityJdbcTemplateRepository
- `private final JdbcTemplate jdbcTemplate`
- `public Amenity add(RestroomAmenity)` -- adds an RestroomAmenity
- `public boolean update(RestroomAmenity)` -- updates on RestroomAmenity
- `public boolean deleteById(int)` -- deletes an RestroomAmenity


### data.RestroomAmenityRepository


Contract for RestroomAmenityJdbcTemplateRepository


- `public Amenity add(RestroomAmenity)`
- `public boolean update(RestroomAmenity)`
- `public boolean deleteById(int)`




### domain.Result
- `private ArrayList<String> messages` -- error messages
- `private ResultType type` -- result type
- `private T payload` -- payload
- `public ResultType getType()` -- type getter
- `public boolean isSuccess()` -- calculated getter, true if no error messages
- `public T getPayload()` -- payload getter
- `public void setPayload(Payload)` -- payload setter
- `public List<String> getMessages()` -- messages getter, create a new list
- `public void addMessage(String, ResultType)` -- adds an error message to messages
### domain.RestroomService
-  `private RestroomRepository repository` -- required data dependency
-  `public RestroomService(RestroomRepository)` -- constructor
-  `public List<Restroom> findByLocation(String)` -- pass-through to repository
-  `public Result add(Restroom)` -- validate, then add via repository
-  `public Result update(Restroom)` -- validate, then update via repository
-  `public Result addAmenity(RestroomAmenity)` -- validate, then update via repository
-  `public Result deleteById(int)` -- pass-through to repository
-  `private Result validate(Restroom)` -- general-purpose validation routine
-  `private Result validate(RestroomAmenity)` -- general-purpose validation routine
### domain.ReviewService
-  `private ReviewRepository repository` -- required data dependency
-  `public ReviewService(ReviewRepository)` -- constructor
-  `public List<Review> findByRestroomId(Integer)` -- pass-through to repository
-  `public Result add(Review)` -- validate, then add via repository
-  `public Result update(Review)` -- validate, then update via repository
-  `public Result deleteById(int)` -- pass-through to repository
-  `private Result validate(Review)` -- general-purpose validation routine### domain.UserService
-  `private UserRepository repository` -- required data dependency
-  `public UserService(UserRepository)` -- constructor
-  `public List<User> findById(int)` -- pass-through to repository
-  `public UserResult add(User)` -- validate, then add via repository
-  `public UserResult update(User)` -- validate, then update via repository
-  `public UserResult deleteById(int)` -- pass-through to repository
-  `private UserResult validate(User)` -- general-purpose validation routine
### domain.AmenityService
-  `private AmenityRepository repository` -- required data dependency
-  `public AmenityService(AmenityRepository)` -- constructor
-  `public List<Amenity> findById(int)` -- pass-through to repository
-  `public AmenityResult add(Amenity)` -- validate, then add via repository
-  `public AmenityResult update(Amenity)` -- validate, then update via repository
-  `public AmenityResult deleteById(int)` -- pass-through to repository
-  `private AmenityResult validate(Amenity)` -- general-purpose validation 
routine


### controllers.RestroomAmmenityController
- `private RestroomService service` -- required service dependency
- `public RestroomAmmenityController(RestroomService)` -- constructor with dependencies
- `public ResponseEntity<Object> add(RestroomAmmenity restroomAmmenity)` -- handles the addition of a new amenity
- `public ResponseEntity<Object> update(RestroomAmmenity restroomAmmenity)` -- handles updating an amenity
- `public ResponseEntity<Void> deleteByKey(int restroomId, int amenity)` -- handles the deletion of an amenity by key


### controllers.RestroomController
- `private RestroomService service` -- required service dependency
- `public RestroomController(RestroomService)` -- constructor with dependencies
- `public ResponseEntity<Object> add(Restroom restroom)` -- handles the addition of a new restroom
- `public ResponseEntity<Object> update(Restroom restroom)` -- handles updating a restroom
- `public ResponseEntity<Void> deleteByKey(int restroomId)` -- handles the deletion of a restroom by key


### controllers.ReviewController
- `private ReviewService service` -- required service dependency
- `public ReviewController(ReviewService)` -- constructor with dependencies
- `public ResponseEntity<Object> add(Review)` -- handles the addition of a new review
- `public ResponseEntity<Object> update(Review)` -- handles updating an review
- `public ResponseEntity<Void> deleteByKey(int reviewId)` -- handles the deletion of an review by key


### controllers.AmmenityController
- `private Amenity Service service` -- required service dependency
- `public Amenity Controller(Amenity Service)` -- constructor with dependencies
- `public ResponseEntity<Object> add(Amenity amenity)` -- handles the addition of a new amenity
- `public ResponseEntity<Object> update(Amenity amenity)` -- handles updating an amenity
- `public ResponseEntity<Void> deleteByKey(int amenity)` -- handles the deletion of an amenity by key


### controllers.UserController
- `private UserService service` -- required service dependency
- `public UserController(UserService)` -- constructor with dependencies
- `public ResponseEntity<Object> add(UserService userService)` -- handles the addition of a new user
- `public ResponseEntity<Object> update(UserService userService)` -- handles updating a user
- `public ResponseEntity<Void> deleteByKey(int userId)` -- handles the deletion of a user by key




# Let's create a markdown file with the content provided.


steps_content = """
## Steps


1. **Create a Maven project**.
2. **Add jUnit 5 (Jupiter) as a Maven dependency** and refresh Maven.
3. **Create packages** following the structure of the application:
   - `controllers`
   - `data`
   - `domain`
   - `models`
4. **Create the `Restroom` model** in `models`.
5. **Create the `Amenity` model** in `models`.
6. **Create the `RestroomAmenity` model** in `models`.
7. **Create the data layer's custom `DataException`** in `data`.
8. **Create the `RestroomRepository` interface** in `data`.
9. **Create the `RestroomJdbcTemplateRepository` class** in `data`:
   - Add the JDBC connection logic and implement methods like `findAll`, `findById`, `add`, `update`, and `deleteById`.
   - Catch `SQLExceptions` and throw `DataException`.
   - Implement `add`, `update`, and `deleteById` methods and test them using `RestroomJdbcTemplateRepositoryTest`.
10. **Extract the `RestroomRepository` interface** (Refactor -> Extract Interface) from `RestroomJdbcTemplateRepository`.
11. **Create the `RestroomService`** class in `domain`:
   - Add a `RestroomRepository` field with a corresponding constructor.
   - Implement methods such as `add`, `update`, `findById`, and `deleteById` and add validation.
   - Generate tests for `RestroomService`.
   - Create a test double (`RestroomRepositoryTestDouble`) to support service testing.
12. **Create `RestroomController`** class in `controllers`:
   - Add a `RestroomService` field with a corresponding constructor.
   - Implement methods like `addRestroom`, `updateRestroom`, `deleteRestroom`, and `viewRestroom`.
13. **Create `App` and the `main` method**:
   - Instantiate all required objects: `RestroomRepository`, `RestroomService`, `RestroomController`, and `RestroomView`.
   - Run the controller within `main`.
14. **Create tests** for the application:
   - Test the `RestroomJdbcTemplateRepository`, `RestroomService`, and `RestroomController` to ensure correct functionality.
   - Implement tests for each method using JUnit 5 and verify data consistency and expected behavior.


## Controller Perspectives


# RESTROOMS


### View Restroom by Name
1. collect restroom name from the view
2. use the restroom to fetch bathrooms from the service
3. use the view to display restrooms


### View Restroom by Amenity
1. collect amenity from the view
2. use the amenity to fetch bathrooms from the service
3. use the view to display restrooms


### Add a Restroom
1. collect a complete and new restroom from the view via a form
2. use the service to add the restroom and grab its result
3. display list view


### Update a Restroom
1. List restrooms in a table
2. Upon user pressing update button, a form will prepopulate with selected restroom’s data
4. update restroom properties (setters) in the view
5. use the service to update/save the restroom and grab its result
6. Display list view


### Delete a Restroom
1. Make sure user is authenticated
1. use the service to delete restroom posted by user
2. display success or failure in the view


# REVIEWS


### View Reviews of All Users
1. Find all reviews of a bathroom by bathroomId


### Add a Review
1. Make sure user is authenticated
2. Collect a complete and new review from the view via a form, associating it with authenticated user
2. use the Service to add the review and grab its result
3. Display detail view of specific restroom with updated reviews


### Update a Review
1. Make sure user is authenticated
2. Upon user pressing update button on a review in detailed view of restroom, a form will prepopulate with selected review’s data based on review id
4. update review properties (setters) in the view
5. use the service to update/save the review and grab its result
6. Display list view by using service find all reviews associated with restroom


### Delete a Restroom
1. Make sure user is authenticated
1. use the service to delete the review by its identifier; use service to validate only authenticated user can delete review associated with user
2. display success or failure in the view




Stretch goal: support pagination?






### Problem Statement: Public Restroom Finder Application


In urban areas, especially in densely populated locations or during outdoor events, finding a clean, accessible public restroom can be a challenging experience. The absence of real-time information about restroom locations, cleanliness, amenities, and availability leads to confusion, inconvenience, and frustration among the public.


### Problem
There is a lack of centralized, easily accessible, and user-friendly solutions that allow individuals to quickly locate public restrooms, assess their cleanliness, and find relevant amenities. This problem is especially evident for people with disabilities, families with children, and tourists who may need specific restroom facilities while on the go.


### Key Issues:
1. **Finding Restrooms:** Public restrooms are often not well-marked, especially in areas where foot traffic is high. Locating the nearest restroom in an unfamiliar area is difficult.
2. **Restroom Cleanliness & Conditions:** Users often rely on anecdotal or outdated information about the cleanliness of restrooms, which can lead to unpleasant experiences.
3. **Accessibility & Amenities:** Restrooms vary widely in the amenities they offer (e.g., baby changing stations, disabled access), making it hard for users with specific needs to find suitable restrooms.
4. **Real-time Information:** Lack of real-time data means users may not know if a restroom is available, if it is occupied, or when it is being cleaned.


### Objective
The objective of the **Public Restroom Finder** application is to create a comprehensive, real-time platform that allows users to:
- **Locate Nearby Restrooms:** Users can find the nearest public restrooms based on their location.
- **Rate & Review Restrooms:** Users can provide reviews of restrooms, offering feedback on cleanliness, accessibility, amenities, and overall experience.
- **Access Restroom Information:** The app provides essential details about each restroom, such as its location, available amenities (e.g., changing tables, disabled access), and the user ratings/cleanliness scores.
- **Track Restroom Availability:** Users can check whether a restroom is currently available, or if there is a wait, improving the overall experience.


### Target Audience:
- **General Public:** People in need of a restroom while traveling, working, or spending time outdoors.
- **Parents with Young Children:** Families looking for restrooms with baby-changing stations.
- **People with Disabilities:** Users in need of accessible restrooms.
- **Tourists:** Visitors to unfamiliar locations in need of reliable restroom locations.
- **Event Organizers:** For managing restroom availability during events or large gatherings.


### Solution:
This application will provide an easy-to-use interface where users can:
- Search for nearby restrooms.
- View reviews and ratings for each restroom.
- View details about the restroom (location, amenities, cleanliness).
- Rate restrooms based on their experience.
- Filter restrooms by type (e.g., accessible, family-friendly, etc.).


By gathering real-time data from users and offering a user-friendly search experience, this app will bridge the gap between people in need of restrooms and the information they require, improving the overall public restroom experience.
