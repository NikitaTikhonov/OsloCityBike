# Oslo bikes assignment

#### Instalation
Go to project derectory.
To install packages run
```sh
yarn
```
IOS specific: To install pods
```sh
yarn pod
```

To run Android app
```sh
yarn android
```

To run IOS app
```sh
yarn ios
```

## Assumptions made and areas to improve

- The Leaflet itself doesn’t have a mobile implementation so it works through WebWiew. There are no maintained packages for RN to work with so I had to look for realizations and write a wrapper for them. At some moments map doesn’t recognize the borders of the screen in the correct way. I could work more on the application and check web implementation but it would require more than 4 hours to make it look perfect.
- There are a lot of stations so the classic bar graph looks too big. And performance is not perfect. I’ve made a few optimizations. Such as hiding stations with zero available bikes and partially rendering data the first time. I could implement a vertical bar graph but it won’t look like a classic bar graph. I was not sure if I should do it as it's won't be a bar graph anymore. In general more work on graph optimization and design is required. I could do it but in this case, assignment won't fit into 3-4 hours
