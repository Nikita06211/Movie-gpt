export const LOGO = 'https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png';
export const USER_AVATAR = "https://occ-0-3752-3647.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229";
export const BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_medium.jpg";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept : 'application/json',
        Authorization: "Bearer" + process.env.REACT_APP_TMDB_KEY,
    },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGUAGES = [{identifier:"en", name:"English"},{identifier:"hindi", name:"Hindi"},{identifier:"spanish", name:"Spanish"}];

export const GROQ_KEY = process.env.REACT_APP_GROQ_KEY;
