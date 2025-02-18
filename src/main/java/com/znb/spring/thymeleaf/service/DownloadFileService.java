package com.znb.spring.thymeleaf.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
@RequiredArgsConstructor
@Service
public class DownloadFileService {
    public void downloadFile(HttpServletResponse response, String filename) throws IOException {
        // 获取文件路径
        String filePath = "tmp/" + filename;

        // 创建文件输入流
        InputStream fileInputStream = getClass().getClassLoader().getResourceAsStream(filePath);
        if (fileInputStream == null) {
            throw new FileNotFoundException("文件未找到: " + filePath);
        }

        // 创建响应输出流
        ServletOutputStream outputStream = response.getOutputStream();

        // 设置响应头
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=" + filename);

        // 将文件内容写入响应输出流
        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = fileInputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }

        // 关闭流
        fileInputStream.close();
        outputStream.close();
    }
}