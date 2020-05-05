import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`
const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: darkslateblue;
`
export const posts = graphql`
  query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          date
          title
        }
        fields { 
          slug 
          }
        excerpt
      }
    }
  }
}
`
const IndexPage = ({ data }) => {
  //console.log(data)
  return (
  <Layout>
    <SEO title="Home" />
    {
      data.allMarkdownRemark.edges.map(({node}) => (
        <div key={node.id}>
          <BlogLink to={node.fields.slug}><BlogTitle>{ node.frontmatter.title } - { node.frontmatter.date}</BlogTitle></BlogLink>
          <p>{ node.excerpt }</p>
        </div>
      ))
    }
    <div><h4>Total: { data.allMarkdownRemark.totalCount } posts</h4></div>
  </Layout>
)
}

export default IndexPage
