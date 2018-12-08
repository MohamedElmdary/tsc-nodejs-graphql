import Query from "./query";
import Mutation from "./mutation";

export default `
 
  ${Query}
  ${Mutation}
  
  schema {
    query: Query
    mutation: Mutation
  }
`;
