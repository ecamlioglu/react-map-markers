'use client'

import {
  Box,
  Flex,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function WithSubnavigation() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'} justifyContent="center" gap="8">
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems="center" alignSelf="center">
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

const DesktopNav = () => {
  const pathName = usePathname();

  const [mounted, setMounted] = useState(false);

  const linkColor = 'gray.600';
  const linkHoverColor = 'gray.800';
  const popoverContentBgColor = 'white';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Stack direction={'row'} spacing={16}>
      {NAV_ITEMS.map((navItem) => {
        const isCurrentPage = pathName === navItem.href;
        return (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Box
                  as="a"
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  opacity={isCurrentPage ? 0.6 : 1}  // Adjust opacity for the current page
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                    opacity: 1,
                  }}>
                  {navItem.label}
                </Box>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Add or List Markers on Map',
    href: '/',
  },
  {
    label: 'Create Direction',
    href: '/routes',
  },
]