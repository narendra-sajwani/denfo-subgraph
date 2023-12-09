// import axios from "axios"; 
// import {MongoClient} from "mongodb"; 
import {
  nftMinted as nftMintedEvent
} from "../generated/Macha/Macha"
import {
  nftMinted
} from "../generated/schema"

// const mongoUri = 'mongodb+srv://doshivarun202:KZajssIpBskVfU4M@cluster0.fors5eb.mongodb.net/'; 
// const mongoClient = new MongoClient(mongoUri); 

export function handlenftMinted(event: nftMintedEvent): void {
  let entity = new nftMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.uri = event.params.uri.toString()
  // try { 
  //   const metadata = await getMetadataUrl(event.params.uri.toString()); 
  //   await saveDocumentToMongoDB(metadata, 'metadata'); 
  // } catch (error) { 
  //   console.error(error); 
  //   throw new Error('Failed to process metadata'); 
  // } 
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// async function getMetadataUrl(metadataUri: string): void { 
//   let metadataUrl: string | undefined; 
 
//   if (metadataUri.startsWith("ipfs://")) { 
//     metadataUrl = `https://ipfs.io/ipfs/${metadataUri.split("ipfs://")[1]}`; 
//   } else if (metadataUri.startsWith("https://")) { 
//     metadataUrl = metadataUri; 
//   } 
 
//   if (!metadataUrl) { 
//     throw new Error('Invalid metadata URL'); 
//   } 
 
//   const metadata = await axios.get(metadataUrl as string); 
//   return metadata; 
// } 

// async function saveDocumentToMongoDB(jsonDocument: any, collectionName: string): void { 
//   try { 
//     await mongoClient.connect(); 
//     console.log('Connected to MongoDB'); 
//     const database = mongoClient.db('denfo'); 
//     const collection = database.collection(collectionName); 
//     const result = await collection.insertOne(jsonDocument); 
//     console.log(`Document inserted with _id: ${result.insertedId}`); 
//   } finally { 
//     await mongoClient.close(); 
//     console.log('Connection to MongoDB closed'); 
//   } 
// } 