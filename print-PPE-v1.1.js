(()=>{
    'use strict';
    async function getTemplateKey() {
      const body = {
        app: 868,
        id: 10,
      };
      try {
        const resp = await kintone.api(
          kintone.api.url("/k/v1/record", true),
          "GET",
          body
        );
         // console.log(resp);
        return resp.record.attachment.value[0].fileKey;
      } catch (err) {
        console.error(err);
      }
    }
    async function downloadTemplateFile(fileKey) {
      
    const url =
      kintone.api.url("/k/v1/file.json", true) +
      "?fileKey=" +
      encodeURIComponent(fileKey);
    const resp = await fetch(url, {
      method: "GET",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      credentials: "include",
    });
    if (!resp.ok)
      throw new Error(`Failed to download file. HTTP ${resp.status}`);
    return await resp.blob();
    }
    kintone.events.on("app.record.detail.show", async (event)=>{
        const record = event.record;
        const fileKey = await getTemplateKey();
        console.log(fileKey);
        await downloadTemplateFile(fileKey);
        return event;
    });

})()

