'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database, Loader2, Wallet2Icon } from 'lucide-react';
import { DataResponse } from '@/types/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatNumber } from "@/lib/utils";

const wallets = [
  '0x701258Feb11dda65956F6226b3eFF88cD5343226',
  '0x588137e7c1Fce64a78e092611609B259bb524DaE',
  '0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43',
  '0x6F1cDbBb4d53d226CF4B917bF768B94acbAB6168',
  '0x802920F421bE5873F53Ebdd8D88778FC94FD9186'
];

const FormSchema = z.object({
  walletAddress: z.string()
    .min(42, 'Address is not a valid ethereum wallet')
    .max(42, 'Address is not a valid ethereum wallet'),
  timestamp: z.date(),
});

const DEFAULT_VALUE = {
  walletAddress: '0xA9D1e08C7793af67e9d92fe308d5697FB81d3E43',
  timestamp: new Date(),
};

const URL = 'http://localhost:3010/tokens/getBalance';

export default function Home() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(FormSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataResponse | null>(null);


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);

      const resp = await fetch(URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      const parsedResponse = await resp.json() as DataResponse;
      setData(parsedResponse);
      setLoading(false);
    } catch (e) {
      let message = null;
      if (e instanceof Error) {
        message = e.message;
      }
      toast({
        title: 'An error occured.',
        description: message || 'An error occured',
        variant: "destructive"
      });
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <TooltipProvider>
        <div className="z-10 w-full min-h-screen max-w-2xl flex flex-col items-center justify-center gap-y-4 font-sans text-sm">
          <p className="text-2xl font-mono font-bold my-4">
            TokenSight.
            <span className="text-base ml-2">Wallet Balance</span>
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="walletAddress">Wallet Address</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a wallet address" />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                          <SelectGroup>
                            <SelectLabel>Wallet addresses</SelectLabel>
                            {wallets.map((wallet) => (
                              <SelectItem key={wallet} value={wallet}>
                                {wallet}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timestamp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="timestamp">Timestamp</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        label="Timestamp"
                        granularity="hour"
                        jsDate={field.value}
                        onJsDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full bg-gray-500 hover:bg-gray-600 text-white' type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Searching...' : ' Search'}
              </Button>
            </form>
          </Form>

          {data && data.error && (
            <Alert className="w-2/3">
              <Database className="h-4 w-4" />
              <AlertTitle>No data found!</AlertTitle>
              <AlertDescription>
                There is no data available for the current search.
              </AlertDescription>
            </Alert>
          )}

          {data && !data.error && (
            <Alert className="w-2/3">
              <Wallet2Icon className="h-4 w-4" />
              <AlertTitle>Search result</AlertTitle>
              <AlertDescription>

                <span className="font-bold mr-2">Wallet Address:</span>
                <Tooltip>
                  <TooltipTrigger>
                    <a href={`https://etherscan.io/address/${data.data.walletAddress}`} target='blank'>{`${data.data.walletAddress.slice(0, 20)}...`}</a>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border border-gray-600 rounded-md p-2">
                    Click to view details on Etherscan
                  </TooltipContent>
                </Tooltip>
                <br />
                <span className="font-bold mr-2">Token Address:</span>
                <Tooltip>
                  <TooltipTrigger>
                    <a href={`https://etherscan.io/address/${data.data.tokenAddress}`} target='blank'>{`${data.data.tokenAddress.slice(0, 20)}...`}</a>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border border-gray-600 rounded-md p-2">
                    Click to view details on Etherscan
                  </TooltipContent>
                </Tooltip>
                <br />
                <span className="font-bold mr-2">Balance:</span> {data.data.balance} <span className='font-bold'>{formatNumber(Number(data.data.balanceWei) / 10 ** 6)} USDC</span>
                <br />
                <span className="font-bold mr-2">Total Price:</span> <span className='font-bold'>{`$ ${formatNumber(data.data.totalPrice)}`}</span>
                <br />
              </AlertDescription>
            </Alert>
          )}
        </div>
      </TooltipProvider >
    </main >
  );
}

