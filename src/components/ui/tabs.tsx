import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn, cva, type VariantProps } from '@/src/utils/style';

const tabVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap bg-ldark px-3 py-1.5 text-xs font-medium text-white  disabled:pointer-events-none disabled:opacity-50 ',
  {
    variants: {
      variant: {
        terminal:
          'data-[state=active]:border-t-2 data-[state=active]:border-accent data-[state=active]:bg-mdark',
        editor:
          'gap-2 bg-mdark text-[#888] data-[state=active]:border-b-[1.5px] data-[state=active]:border-accent/50 data-[state=active]:bg-mdark data-[state=active]:text-accent',
      },
    },
    defaultVariants: {
      variant: 'terminal',
    },
  },
);

export interface TabProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabVariants> {}

export interface TabsListProps {
  className?: string;
}

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center bg-ldark',
      className,
    )}
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabProps
>(({ variant, className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabVariants({ variant, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('ml-2 mt-2 ', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
