import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'
import {signOut} from 'firebase/auth'
import {auth} from '@/firebase'

import HomePage from './../pages/HomePage.vue'
import ContactPage from '@/pages/ContactPage.vue'
import SharedPage from '@/pages/SharedPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

import SignInPage from '@/pages/Auth/SignInPage.vue'
import SignInFinishPageVue from '@/pages/Auth/SignInFinishPage.vue'
import SignOutPage from '@/pages/Auth/SignOutPage.vue'

import AdminLayout from '@/pages/Admin/AdminLayout.vue'
import AdminUsersPage from '@/pages/Admin/Users/UsersPage.vue'

import AdminFolderLayout from '@/pages/Admin/Folders/FolderLayout.vue'
import AdminFoldersPage from '@/pages/Admin/Folders/FoldersPage/FoldersPage.vue'
import AdminFolderContentPage from '@/pages/Admin/Folders/FolderContent/FolderContent.vue'
import AdminPublicPhotosPage from '@/pages/Admin/Public/PublicPhotos.vue'

const routes = [
    {path:'/', component: HomePage},
    {
        path:'/admin',
        component: AdminLayout,
        beforeEnter: async (_to:any, _from:any) => {
            const user = await getCurrentUser() as any
            if(!user) return '/'
            const token = await user.getIdTokenResult()
            if(!token.claims.admin) return '/'
            return true
        },
        children:[
            {path:'', redirect:'/admin/folders'},
            {
                path:'folders',
                component: AdminFolderLayout,
                children:[
                    {
                        path:'',
                        component: AdminFoldersPage,
                    },
                    {
                        path:':folderName',
                        component: AdminFolderContentPage,
                    },
                ]
            },
            {
                path:'public',
                component: AdminPublicPhotosPage,
            },
            {path:'users', component: AdminUsersPage},
        ]
    },
    {path:'/contact', component: ContactPage},
    {
        path:'/shared',
        component: SharedPage,
        beforeEnter: async (_to:any, _from:any) => {
            const user = await getCurrentUser()
            if(!user) return '/sign-in'
            return true
        },
    },
    {
        path:'/sign-in',
        component: SignInPage,
        beforeEnter: async (_to:any, _from:any) => {
            const user = await getCurrentUser()
            if(user) return '/'
            return true
        },
    },
        {
            path:'/sign-in/finish',
            component: SignInFinishPageVue,
            beforeEnter: async (_to:any, _from:any) => {
                const user = await getCurrentUser()
                if(user) return '/'
                return true
            },
    },
    {
        path:'/sign-out',
        component: SignOutPage,
        beforeEnter: async (_to:any, _from:any) =>{
            const user = await getCurrentUser()
            if(user) await signOut(auth)
            return '/'
        }
    },
    {path:'/:pathMatch(.*)*', component: NotFoundPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router