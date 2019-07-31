import * as ipfsearch from "./ipfsearch-indexlib"

const web3 = require('web3');
const bs58 = require('bs58');
const IPFS = require('ipfs-mini');
const test = require('ipfs-http-client')
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const testIPFS = new test({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

let count = 0;

let TartarusContract = require('../src/contracts/Tartarus.json');
let tartarusAddress = '0x3ca7832b2edd307b075903e2aac2ff04308ad001';
let provider = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/bdeb06c1bd2e4458aedfd3ada2fa4366"));
var instance = new provider.eth.Contract(TartarusContract.abi, tartarusAddress);
let indexer = new ipfsearch.Indexer();


let getPosts = async props => {
  let posts = await Promise.all(props.map(post => getPost(post)));
  await appendPostsToIndex(posts);
  // console.log(2)
};

let getPost = props => {
  return instance.methods.getPost(props.returnValues.forum, props.returnValues.postId).call();

};

let appendPostsToIndex = async props => {
  await Promise.all(props.map(post => appendPostToIndex(post)));
}

let appendPostToIndex = async props => {
  count++;
  const postHex = '1220' + props[0].slice(2);
    const postBytes32 = Buffer.from(postHex, 'hex');
    const postIpfsHash = bs58.encode(postBytes32); 
    let postData = await ipfs.catJSON(postIpfsHash);
    // console.log(postData)
    if (postData !== null) {
      // console.log(postData)
      let postTitle = postData.title;
      let postType = postData.type;
      let postPost = postData.post;
      let postCreator = provider.utils.toUtf8(props[1]);
      // console.log(postCreator)
      // console.log(indexer)
      indexer.addToIndex(new ipfsearch.Document(postIpfsHash, postTitle + " " + postType + " " + postPost + " " + postCreator))        
      // indexer.addToIndex(new ipfsearch.Document(postIpfsHash, postCreator))        
    }  

}

let main = async () => {
  const posts = await instance.getPastEvents("PostCreated", {
    fromBlock: 0,
    toBlock: "latest"
  });
  // console.log(posts.length)
  // console.log(1)
  await getPosts(posts); 
  // console.log(3)
  // console.log(count)
  indexer.persist("assets/inv/", "assets/inx/","Jaren Lynch","Tartarus Index", "", 1000)
  console.log(indexer)
  testIPFS.addFromFs('./assets', { recursive: true }, (err, assetsResult) => {
    console.log(assetsResult)
    let metaFile = require('./assets/inx/.meta.json')
    metaFile.inxURLBase = '/ipfs/' + assetsResult[4].hash + '/inx/';
    metaFile.invURLBase = '/ipfs/' + assetsResult[4].hash + '/inv/';
    if (err) { throw err }
    ipfs.addJSON(metaFile, (err, result) => {
      console.log(metaFile)
      console.log(err, result);
    });    
    // QmeoYDCCYUu4398SUFMckmrPnXPVkknZaMYkSsS8B2aMeW
  })
};

main();




// let indexer = new ipfsearch.Indexer()
// indexer.addToIndex(new ipfsearch.Document("Python","A great, nice programming language. Super user-friendly."))
// indexer.addToIndex(new ipfsearch.Document("Javascript","A language that was hacked together in 14 days and ECMA is trying to make it better. Still feels hacked together tho"))
// //add more docs...

// indexer.persist("assets/sortedindex.inx", "assets/index.inx","authors name","index name","URL", 1000)