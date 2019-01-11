import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GoogleDriveService {
    private accessToken: string;
    private url: string;

    constructor(private httpClient: HttpClient) { 
        this.url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media';
    }

    setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    uploadFile(file: any) {
        return this.httpClient.post(this.url, file, { 
            headers: new HttpHeaders()
                .set('Authorization', 'Bearer ' + this.accessToken)
                .append('Content-Type', 'application/pdf')
            });
    }
}