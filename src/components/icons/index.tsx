import { cn } from "@/lib/utils";
import { HiChartPie,HiUsers } from "react-icons/hi";

export const Icons = {

  PieChart: () => <HiChartPie size={22} />,
  HiUsers: () => <HiUsers size={22} />,
 
  Pages:()=>(
    <svg
    aria-hidden="true"
    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
  ),
  MenuDropdown:()=>(
    <svg
    aria-hidden="true"
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
  ),
  logo: () => (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="200.000000pt" height="196.000000pt" viewBox="100 0 390.000000 300.000000"
      preserveAspectRatio="xMidYMid meet">

      <g transform="translate(0.000000,196.000000) scale(0.100000,-0.100000)"
        fill="#000000" stroke="none">
        <path d="M2448 1572 l-378 -2 0 -508 0 -507 545 3 545 2 0 315 c0 173 3 315 8
   315 4 0 115 -143 248 -318 l241 -317 94 2 94 2 3 406 2 405 300 0 c277 0 303
   -2 354 -20 107 -41 175 -136 184 -261 9 -128 -44 -235 -148 -293 l-55 -31
   -247 -3 -248 -3 0 -102 0 -102 267 5 c226 5 276 9 318 24 225 82 346 251 346
   481 0 291 -209 497 -511 506 -41 1 -234 1 -427 0 l-353 -1 -2 -311 -3 -310
   -230 302 c-126 167 -233 307 -236 312 -3 4 -53 9 -110 9 l-104 0 -3 -411 -2
   -411 -323 2 -322 3 -3 108 -3 107 241 0 240 0 0 100 0 100 -240 0 -240 0 0
   100 c0 73 3 100 13 100 6 0 129 1 272 3 l260 2 3 94 c1 52 -1 97 -5 100 -4 3
   -178 5 -385 3z"/>
        <path d="M1341 1550 c-133 -48 -201 -145 -201 -287 0 -174 72 -240 343 -314
   171 -46 217 -86 187 -159 -18 -43 -61 -63 -141 -63 -85 0 -164 25 -242 78
   l-62 41 -62 -75 c-35 -41 -63 -78 -63 -82 0 -13 83 -69 146 -99 84 -41 173
   -60 280 -60 245 0 385 127 372 335 -4 55 -11 84 -31 117 -47 81 -112 118 -310
   175 -175 50 -197 65 -197 131 0 38 43 77 95 86 52 10 139 -11 220 -52 39 -20
   73 -37 77 -37 4 0 33 36 63 80 l56 79 -23 19 c-41 32 -133 75 -195 91 -87 23
   -243 21 -312 -4z"/>
        <path d="M4250 1204 c-91 -7 -183 -13 -205 -14 l-40 -1 88 -82 87 -82 22 -102
   c12 -57 24 -103 28 -103 3 0 57 80 120 178 62 97 120 187 128 200 14 21 13 22
   -24 21 -22 -1 -113 -7 -204 -15z"/>
      </g>
    </svg>
  ),
  
 
  
  delete: () => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 20 20"
      className="text-xl text-red-400 hover:text-red-500"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  previousArrow: () => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 20 20"
      className="text-3xl"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  nextArrow: () => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 20 20"
      className="text-3xl"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  forwardArrow: ({ size = "xl" }: { size?: string }) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 20 20"
      className={`text-${size}`}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
 
  
  settingsVertical: () => (
    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ), 
  deleted: ({ size = "xl" }: { size?: string }) => (
    <svg className={cn(size, "svg-icon")} viewBox="0 0 20 20">
      <path fill="none" d="M16.588,3.411h-4.466c0.042-0.116,0.074-0.236,0.074-0.366c0-0.606-0.492-1.098-1.099-1.098H8.901c-0.607,0-1.098,0.492-1.098,1.098c0,0.13,0.033,0.25,0.074,0.366H3.41c-0.606,0-1.098,0.492-1.098,1.098c0,0.607,0.492,1.098,1.098,1.098h0.366V16.59c0,0.808,0.655,1.464,1.464,1.464h9.517c0.809,0,1.466-0.656,1.466-1.464V5.607h0.364c0.607,0,1.1-0.491,1.1-1.098C17.688,3.903,17.195,3.411,16.588,3.411z M8.901,2.679h2.196c0.202,0,0.366,0.164,0.366,0.366S11.3,3.411,11.098,3.411H8.901c-0.203,0-0.366-0.164-0.366-0.366S8.699,2.679,8.901,2.679z M15.491,16.59c0,0.405-0.329,0.731-0.733,0.731H5.241c-0.404,0-0.732-0.326-0.732-0.731V5.607h10.983V16.59z M16.588,4.875H3.41c-0.203,0-0.366-0.164-0.366-0.366S3.208,4.143,3.41,4.143h13.178c0.202,0,0.367,0.164,0.367,0.366S16.79,4.875,16.588,4.875zM6.705,14.027h6.589c0.202,0,0.366-0.164,0.366-0.366s-0.164-0.367-0.366-0.367H6.705c-0.203,0-0.366,0.165-0.366,0.367S6.502,14.027,6.705,14.027z M6.705,11.83h6.589c0.202,0,0.366-0.164,0.366-0.365c0-0.203-0.164-0.367-0.366-0.367H6.705c-0.203,0-0.366,0.164-0.366,0.367C6.339,11.666,6.502,11.83,6.705,11.83z M6.705,9.634h6.589c0.202,0,0.366-0.164,0.366-0.366c0-0.202-0.164-0.366-0.366-0.366H6.705c-0.203,0-0.366,0.164-0.366,0.366C6.339,9.47,6.502,9.634,6.705,9.634z"></path>
    </svg>
  )
}