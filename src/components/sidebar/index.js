"use client"


import React, { useEffect, useRef, useState, Fragment } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import SidebarLinkGroup from "./sidebarLinkGroup";
import { CalendarDaysIcon, Squares2X2Icon, UserIcon, TableCellsIcon, FolderIcon, 
  CogIcon, ChartBarIcon, QueueListIcon, ArrowRightEndOnRectangleIcon, ArrowLeftIcon,
  ChevronDownIcon, UsersIcon } from '@heroicons/react/24/outline';

const Sidebar =  ({ sidebarOpen, setSidebarOpen }) => {

  const pathname = usePathname()

  const trigger = useRef(null)
  const sidebar = useRef(null)

  let storedSidebarExpanded = "true"

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }) => {
      if (!sidebarOpen || key !== "Escape") return
      setSidebarOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded")
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded")
    }
  }, [sidebarExpanded])

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <ArrowLeftIcon width="28" height="24"/>
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                          "/" ||
                          pathname.includes("dashboard")) &&
                          "bg-graydark dark:bg-meta-4"}`}
                        onClick={e => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <Squares2X2Icon  width="20"  height="20"/>
                        Dashboard
                        <ChevronDownIcon width="20" height="20" className={`absolute right-4 top-1/2 -translate-y-1/2 ${open &&
                            "rotate-180"}`}/>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${!open &&
                          "hidden"}`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname ===
                                "/" && "text-white"}`}
                            >
                              eCommerce
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Fragment>
                  )
                }}
              </SidebarLinkGroup>
              <li>
                <Link
                  href="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "calendar"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <CalendarDaysIcon  width="20" height="20"/>
                  Calendar
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "profile"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <UserIcon width="20" height="20"/>
                  Profile
                </Link>
              </li>
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/forms" || pathname.includes("forms")
                }
              >
                {(handleClick, open) => {
                  return (
                    <Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                          "/dashboard/forms" ||
                          pathname.includes("forms")) &&
                          "bg-graydark dark:bg-meta-4"}`}
                        onClick={e => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <FolderIcon widths="20" height="20"/>
                        Forms
                        <ChevronDownIcon width="20" height="20" className={`absolute right-4 top-1/2 -translate-y-1/2 ${open &&
                            "rotate-180"}`}/>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${!open &&
                          "hidden"}`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/dashboard/forms/form-elements"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname ===
                                "/forms/form-elements" && "text-white"}`}
                            >
                              Form Elements
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/dashboard/forms/form-layout"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname ===
                                "/forms/form-layout" && "text-white"} `}
                            >
                              Form Layout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Fragment>
                  )
                }}
              </SidebarLinkGroup>
              <li>
                <Link
                  href="/dashboard/tables"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "tables"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <TableCellsIcon width="20" height="20"/>                
                  Tables
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/categories"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "settings"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <UsersIcon width="20" height="20"/>
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/status"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "settings"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <UsersIcon width="20" height="20"/>
                  Status
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "settings"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <UsersIcon width="20" height="20"/>
                  Users
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "settings"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <CogIcon width="20" height="20"/>
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  href="/chart"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(
                    "chart"
                  ) && "bg-graydark dark:bg-meta-4"}`}
                >
                  <ChartBarIcon width="20" height="20"/>
                  Chart
                </Link>
              </li>

              <SidebarLinkGroup activeCondition={pathname === "/ui" || pathname.includes("ui")}  >
                {(handleClick, open) => {
                  return (
                    <Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                          "/ui" ||
                          pathname.includes("ui")) &&
                          "bg-graydark dark:bg-meta-4"}`}
                        onClick={e => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <QueueListIcon width="20" height="20"/>
                        UI Elements
                        <ChevronDownIcon width="20" height="20" className={`absolute right-4 top-1/2 -translate-y-1/2 ${open &&
                            "rotate-180"}`}/>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${!open &&
                          "hidden"}`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/ui/alerts"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname ===
                                "/ui/alerts" && "text-white"}`}
                            >
                              Alerts
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/ui/buttons"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname ===
                                "/ui/buttons" && "text-white"}`}
                            >
                              Buttons
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Fragment>
                  )
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/auth" || pathname.includes("auth")
                }
              >
                {(handleClick, open) => {
                  return (
                    <Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname ===
                          "/auth" ||
                          pathname.includes("auth")) &&
                          "bg-graydark dark:bg-meta-4"}`}
                        onClick={e => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <ArrowRightEndOnRectangleIcon width="20" height="20"/>
                        Authentication
                        <ChevronDownIcon width="20" height="20" className={`absolute right-4 top-1/2 -translate-y-1/2 ${open && "rotate-180"}`}/>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"}`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/auth/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname ===
                                "/auth/signin" && "text-white"}`}
                            >
                              Sign In
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/auth/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname ===
                                "/auth/signup" && "text-white"}`}
                            >
                              Sign Up
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Fragment>
                  )
                }}
              </SidebarLinkGroup>          
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
