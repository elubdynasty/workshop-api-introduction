import * as React from "react";
import Layout from "./Layout";
import axios from 'axios'


const App = () => {

  const [isLoading, setisLoading] = React.useState(true)
  const [posts, setPosts] = React.useState([])

  //useEffect(() => {

  //})

  React.useEffect(() => {
    
    //console.log('Loaded')
    getData();

  }, []) //useEffect needs to listen to specific []

  const getData = () => {

    //JS Promise

    const ENDPOINT = 'http://api.dailysmarty.com/posts'; 
    
    axios(ENDPOINT)
    .then((response: any) => {
       setisLoading(false);
      console.log('res', response.data)

      if(response.data.posts){

      } else {
        console.log('An error happened')
      }

      setPosts(response.data.posts);
    })
    .catch(error => {
       setisLoading(false);
      console.log('An error happened', error)
    })
  }

  const postsRenderer = posts.map(post => (<div className='post-container' key={post.id}>
  
    <a href='post.url_for_post' target='_blank' className="title">
      {post.title}
    </a>

    {post.associated_topics?.length > 0 && (
    <div className="topics">
      {post.associated_topics.map((topic: string) => 
      <div key={topic} className='label'>
        {topic}
      </div>
      )}

    </div>
    )}
    <div>{post.content && post.content.replace(/(<([^>]+)>)/gi, '')}</div>
  </div>)) //implicit return

  //cant call JSON directly to React
  const content = isLoading ? <div>Loading ...</div>: <div><pre>{postsRenderer}</pre></div> //null means to make JSON pretty 
  return <Layout>
  
    {content}</Layout>;
};

export default App;
