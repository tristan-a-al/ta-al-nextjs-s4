import { Fragment } from "react";
import Head from "next/head";

import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";
// import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
  const featuredEvents = getFeaturedEvents();

  return (
    // <Fragment>
    //   <Head>
    //     <title>Max' Blog</title>
    //     <meta
    //       name="description"
    //       content="I post about programming and web development."
    //     />
    //   </Head>
    //   <Hero />
    //   <FeaturedPosts posts={props.posts} />
    // </Fragment>
    <Fragment>
      <EventList items={props.events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800
  };
}

// export function getStaticProps() {
//   const featuredPosts = getFeaturedPosts();

//   return {
//     props: {
//       posts: featuredPosts,
//     },
//   };
// }

export default HomePage;
