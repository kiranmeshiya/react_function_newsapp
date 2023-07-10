
import React, {useEffect, useState} from 'react'
import { Card, Container, Row, Button,Badge,Col} from 'react-bootstrap';
import Spiner from './Spiner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

 const capitalizedLetter = (String) => {
    return String.charAt(0).toUpperCase() + String.slice(1);
}
// document.title = `${capitalizedLetter(props.category)} - NewsMonkey App`

useEffect(() => {
  updateNews(); 
}, [])

const updateNews = async () => {
  props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=991f660489604814b04ee9cff7bbea91&&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(70);
    setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
}

// const handlePrevClick = async () => {
//   setPage(page-1)
//   updateNews();
// }

// const handleNextClick = async () => { 
//   setPage(page+1)
//   updateNews();
// }


const fetchMoreData = async () => {
  setPage(page+1) 
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=991f660489604814b04ee9cff7bbea91&&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
 };

  return (
    <div>
         <div>
        
        <Container className='text-center'>
            <h2 className='mt-4 mb-3 text-center text-dark'>NewsMonkey - Daily News Top headlines From <span className='text-danger'>{capitalizedLetter(props.category)}</span></h2>
            {loading && <Spiner />}
          <InfiniteScroll
           dataLength={articles.length}
           next={fetchMoreData}
           hasMore={articles.length !== totalResults}
           loader={loading && <Spiner/>}
           style={{overflow:"hidden"}}
        >
          <div>
      
          
            <Row>
                {
                    articles.map((item,index) => {
                        return (
                          <Col lg={3} md={6} className='mb-3'> 
                            <Card className='m-2 p-0 mb-3'   key={index} >
                                 <Badge bg="primary" className='sorce' style={{borderRadius:'none'}}>{item.source.name}</Badge>
                            <Card.Img variant="top" src={item.urlToImage?item.urlToImage:'https://cdn.ndtv.com/common/images/ogndtv.png'} className="imgcard" />
                            <Card.Body>
                              <Card.Title>{item.title?item.title.slice(0,30):""}</Card.Title>
                              <Card.Text className='mb-2'>
                               {item.description?item.description.slice(0,70):"NDTV.com: India, Business, Bollywood, Cricket, Video and Breaking News"}
                              </Card.Text>
                              <Card.Text className='pt-0'>
                                <p className='text-muted' style={{fontSize:'12px'}} ><strong>By</strong> {!item.author? 'unknowe' : item.author.slice(0,30)}<br/> <strong>On</strong> {new Date(item.publishedAt).toGMTString()}</p>
                              </Card.Text>
                              <Card.Text className='text-center'>
                              <Button variant="primary" target='_blank' href={item.url} >Read more</Button>
                              </Card.Text>
                            </Card.Body>
                          </Card>
                          </Col>
                    )})
                }
            </Row>
            </div>
                  </InfiniteScroll> 
            {/* <Row>
                <Col sm={12} className='pt-3 pb-5 d-flex justify-content-between'>
                    <Button disabled={page <=1 } className='btn btn-danger px4' onClick={prevHandler} >❮ Previous</Button>
                    <Button className='btn btn-danger px-4' disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} onClick={nextHandler} >Next ❯</Button>
                </Col>
            </Row> */}
        </Container>

      </div>
    </div>
  )
}
export default News