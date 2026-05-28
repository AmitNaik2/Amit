// test-epic.js

async function getEpicDeals() {
  try {
    const res = await fetch('https://graphql.epicgames.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query searchStoreQuery($category: String, $locale: String, $country: String) {
            Catalog {
              searchStore(category: $category, count: 10, sortBy: "price", sortDir: "ASC") {
                elements {
                  title
                  price(country: $country) {
                    totalPrice {
                      discountPrice
                      originalPrice
                      fmtPrice {
                        discountPrice
                        originalPrice
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          category: "games/edition/base",
          locale: "en-US",
          country: "US"
        }
      })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

getEpicDeals();
