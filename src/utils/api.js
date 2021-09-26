function getIds(numResults,category='top'){
    let categoryOptions = ['top','new','best']
    if(!categoryOptions.includes(category)) console.log('category must be one of', categoryOptions)
    let url = `https://hacker-news.firebaseio.com/v0/${category}stories.json`
    return fetch(url)
        .then(top500IDs=>{
            return top500IDs.json()
        })
        .then(top500IDs=>{
            return top500IDs.slice(0,numResults)
        })
}

export function getItem(id){
    let url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    return fetch(url)
        .then(story=>{
            return story.json()
        })
}

export async function getItems(IDs){
    console.log(IDs)
    let items = await Promise.all(IDs.map(id=>{
        return getItem(id)
    }))
    console.log(items)
    return items
}

export async function getCategory(numResults, category='top'){
    let topIDs = await getIds(numResults,category)
    let stories = await getItems(topIDs)
    return stories
}


export async function getStories(IDs){
    let items = await getItems(IDs)
    return items.filter(item=>item.type==='story')
}


export async function getUser(userID){
    let url = `https://hacker-news.firebaseio.com/v0/user/${userID}.json`
   /* let url = `https://hacker-news.firebaseio.com/v0/user/sohkamyung.json?print=pretty`*/
    return fetch(url)
        .then(user=>{
            return user.json()
        })
}


