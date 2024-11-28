import {GROQ_KEY} from "./constants";
import Groq from "groq-sdk";

const groq = new Groq({ 
    apiKey: GROQ_KEY,
    dangerouslyAllowBrowser: true
});

export default groq;
//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