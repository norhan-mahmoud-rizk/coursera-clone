import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  imports: [CommonModule,NavbarComponent]
})

export class VideoPlayerComponent implements OnInit {
  course: any;
  moduleTitle: string = '';
  video: any;

  currentVideoList: any[] = [];
  currentIndex: number = 0;

  constructor(private location: Location, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const navigation = this.location.getState() as any;

    this.course = navigation?.course;
    this.moduleTitle = navigation?.moduleTitle;
    this.video = navigation?.video;

    console.log('Current Course:', this.course);
    console.log('Current Module Title:', this.moduleTitle);
    console.log('Current Video:', this.video);

    if (this.course && this.moduleTitle && this.video) {
      const matchingModule = this.course.modules.find((mod: any) =>
        mod.videos.some((group: any) => group.title === this.moduleTitle)
      );

      if (matchingModule) {
        const group = matchingModule.videos.find((g: any) => g.title === this.moduleTitle);
        if (group) {
          this.currentVideoList = group.videos;
          this.currentIndex = group.videos.findIndex((v: any) => v.videoID === this.video.videoID);
        }
      }
    }
  }

  goToNextVideo() {
    if (this.currentIndex < this.currentVideoList.length - 1) {
      this.currentIndex++;
      this.video = this.currentVideoList[this.currentIndex];
      console.log('Next Video:', this.video);
    }
  }

  goToPreviousVideo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.video = this.currentVideoList[this.currentIndex];
      console.log('Previous Video:', this.video);
    }
  }

  selectVideo(index: number) {
    this.currentIndex = index;
    this.video = this.currentVideoList[this.currentIndex];
    console.log('Selected Video:', this.video);
  }

  // sanitizeUrl(url: string): SafeResourceUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }
}
