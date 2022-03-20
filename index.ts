import ws from "ws";
import { createClient } from "graphql-ws";
const client = createClient({
  url: "ws://localhost:3800/graphql",
  webSocketImpl: ws,
  connectionParams: async () => {
    return {
      token: "Bearer 'token here'",
    };
  },
});
console.log(client);
const subs = async () => {
  const onNext = (data: any) => {
    /* handle incoming values */
    console.log(JSON.stringify(data, null, 4));
  };

  let unsubscribe = () => {
    /* complete the subscription */
  };

  await new Promise((resolve, reject) => {
    unsubscribe = client.subscribe(
      {
        query: `subscription {      
          subscriptionTest{
	        id
            name
            email
          }
        }`,
      },
      {
        next: onNext,
        error: reject,
        complete: () => console.log("complete"),
      }
    );
  }).catch((err) => {
    console.log(err);
  });
};
subs();
