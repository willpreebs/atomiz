'use client';

import { Anchor, Button, Card, Center, Container, Paper, Stack, TextInput, Title } from '@mantine/core'
import Image from 'next/image'
import 'dotenv/config';
import axios from 'axios';
import { isNotEmpty, useForm } from '@mantine/form';
import { useState } from 'react';

export default function Home() {

  const [url, setUrl] = useState(null);

  const url_validator = (url) => {
    const REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    return REGEX.test(url);
  }

  const form = useForm({
    initialValues: { url: '' },
    validate: {
      // url: () => url_validator() ? null : 'Invalid URL',
    }
  })

  const base = process.env.BASE || 'http://localhost:4000';
  const api = process.env.API || `${base}/url`;

  const getNewAtomizedUrl = (input) => {
    console.log(api);
    const res = axios.post(api, { url: input });
    return res;
  }

  const displayNewUrl = (response) => {
    console.log(response.data);
    const id = response.data._id;
    const url = `${base}/${id}`;
    setUrl(url);
  }

  const handleSubmit = ({ url }) => {
    console.log(url);
    const responsePromise = getNewAtomizedUrl(url);
    responsePromise.then(displayNewUrl);
  }

  return (
    <Container size={420} my={40}>
      <Card>
        <Stack gap='xl'>
          <Title ta='center'>
            Atomiz URL
          </Title>
          <form className='space-y-4' onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'{...form.getInputProps('url')} />
            <Button fullWidth type='submit'>Generate mini url!</Button>
          </form>
          <>
            {url && (
              <Anchor href={url} target='_blank' c='green'>{url}</Anchor>
            )}
          </>
        </Stack>
      </Card>

    </Container>

  )
}
