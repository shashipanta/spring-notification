<script>
   import { page } from '$app/stores';
   import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
   import { ChartPieSolid, 
      GridSolid, 
      MailBoxSolid, 
      UserSolid, 
      AddressCardSolid,
      ArrowRightToBracketSolid, 
      FileEditSolid } from 'flowbite-svelte-icons';
   $: activeUrl = $page.url.pathname;

   let activeClass = 'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
   let nonActiveClass = 'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';
 </script>

 <Sidebar {activeUrl} {activeClass} {nonActiveClass}>
   <SidebarWrapper
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white-500 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    >
     <SidebarGroup>
       <SidebarItem label="Dashboard" href="/api/dashboard" active={activeUrl === '/api/dashboard'}>
         <svelte:fragment slot="icon">
           <ChartPieSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
         </svelte:fragment>
       </SidebarItem>
       <SidebarItem label="Kanban" href="#">
         <svelte:fragment slot="icon">
           <GridSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
         </svelte:fragment>
         <svelte:fragment slot="subtext">
           <span class="inline-flex justify-center items-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"> Pro </span>
         </svelte:fragment>
       </SidebarItem>
       <SidebarItem label="Inbox" href="#" active={activeUrl === '/api/chat'}>
         <svelte:fragment slot="icon">
           <MailBoxSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
         </svelte:fragment>
         <svelte:fragment slot="subtext">
           <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
         </svelte:fragment>
       </SidebarItem>
       <SidebarItem label="Tenants" href="/api/owners/tenants" active={activeUrl === '/api/tenants'}>
         <svelte:fragment slot="icon">
           <UserSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
         </svelte:fragment>
       </SidebarItem>
      <SidebarItem label="Properties" href="/api/property" active={activeUrl.includes('/api/property')}>
         <svelte:fragment slot="icon">
           <AddressCardSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
         </svelte:fragment>
       </SidebarItem>
       <SidebarItem label="Sign In" >
         <svelte:fragment slot="icon">
           <ArrowRightToBracketSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
         </svelte:fragment>
       </SidebarItem>
       <SidebarItem label="Contracts" active={activeUrl === '/api/contracts'}>
         <svelte:fragment slot="icon">
           <FileEditSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
         </svelte:fragment>
       </SidebarItem>
     </SidebarGroup>
   </SidebarWrapper>
 </Sidebar>