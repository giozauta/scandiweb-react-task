import { gql } from "@apollo/client";


export const getItems = gql`
    query {
        category {
            products {
                name
                gallery
                inStock
                prices {
                    currency
                    amount
                }
                category
                description
                attributes {
                    id
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }
`;

export const getItemsByCategory = gql`
    query getItemsByCategory($title: String!) {
        category(input: { title: $title }) {
            products {
                name
                gallery
                inStock
                prices {
                    currency
                    amount
                }
                category
                description
                attributes {
                    id
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }
`;

export const getCategories = gql`
    query {
        category {
            products {
                category
            }
        }
    }
`;

export const getCurrencies = gql`
    query {
        currencies
    }
`;