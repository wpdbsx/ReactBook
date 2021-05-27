import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path";
import fs from "fs";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";
import PreloadContext from "./lib/PreloadContext";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
// asset-manifest.json에서 파일 경로들을 조회합니다.
const statsFile = path.resolve("./build/loadable-stats.json");

// const chunks = Object.keys(manifest.files)
//   .filter((key) => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾아서
//   .map((key) => `<script src="${manifest.files[key]}"></script>`) // 스크립트 태그로 변환하고
//   .join(""); // 합침

function createPage(root, tags) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>React App</title>
      ${tags.styles}
        ${tags.links}
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        ${root}
      </div>
      ${tags.scripts}
    
    </body>
    </html>
      `;
}

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수입니다.
const serverRender = async (req, res, next) => {
  // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 줍니다.

  const context = {};
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const preloadContext = {
    done: false,
    promises: [],
  };
  //필요한 파일을 추출하기 위한 ChunkExtractor
  const extractor = new ChunkExtractor({ statsFile });
  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <PreloadContext.Provider value={preloadContext}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </PreloadContext.Provider>
    </ChunkExtractorManager>
  );

  ReactDOMServer.renderToStaticMarkup(jsx); // renderToStaticMarkup으로 한번 렌더링합니다.
  try {
    await Promise.all(preloadContext.promises); // 모든 프로미스를 기다립니다.
  } catch (e) {
    return res.status(500);
  }
  preloadContext.done = true;
  const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
  // JSON을 문자열로 변환하고 악성 스크립트가 실행되는 것을 방지하기 위해 <를 치환 처리
  // https://redux.js.org/recipes/server-rendering#security-considerations
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const stateScript = `<script>__PRELOADED_STATE__=${stateString}</script>`; // 리덕스 초기 상태를 스크립트로 주입합니다.
  // res.send(createPage(root, stateScript)); // 클라이언트에게 결과물을 응답합니다.

  const tags = {
    scripts: stateScript + extractor.getScriptTags(), //스크립트 앞부분에 리덕스 상태 넣기
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
  };
  res.send(createPage(root, tags)); // 결과물 응답
};
// 미리 불러와야 하는 스타일/스크립트를 추출하고

const server = express.static(path.resolve("./build"), {
  index: false, // "/" 경로에서 index.html을 보여 주지 않도록 설정
});

app.use(server); // 순서가 중요합니다. serverRender 전에 위치해야 합니다.
app.use(serverRender);

// 5000 포트로 서버를 가동합니다.
app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});
