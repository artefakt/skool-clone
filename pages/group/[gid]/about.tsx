import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Entry.module.css";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import AboutMain from "@/components/About/AboutMain";
import {getGroupAbout} from "@/lib/gruopLib/groupApi";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Group, AboutProps } from "@/interfaces/group.type";
import {dbConnect, dbDisconnect} from '@/lib/mongoClient';

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<AboutProps> = async (context) => {
  const gid = context.query.gid as string;
  // if there is no gid, return {};
  if(!gid) return {props: {}};
  // get about page data
  try {
    await dbConnect();
  } catch (e) {
    console.log('fail to connect with database', e);
    return {props: {}};
  }
  const res: AboutProps = await getGroupAbout(gid);
  await dbDisconnect();
  return {props: {
    group: JSON.parse(JSON.stringify(res.group)),
    memberNum: res.memberNum,
    creator: JSON.parse(JSON.stringify(res.creator))
  }}
}


export default function About({group, memberNum, creator}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  const matchDown = useMediaQuery("(max-width:1320px)");
  // fetch no data
  if(!group || !memberNum || !creator) return;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <AboutMain group={group} memberNum={memberNum} creator={creator}/>
      </main>
    </>
  );
}