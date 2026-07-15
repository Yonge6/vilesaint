/**
 * VileSaint Canvas Poster Generator
 * Generates 1080x1350 PNG judgment posters and comment share images.
 */
const CanvasPoster = (() => {
  const W = CONFIG.canvas.posterWidth;
  const H = CONFIG.canvas.posterHeight;
  const QR_SIZE = CONFIG.canvas.qrCodeSize;

  /**
   * Generate judgment poster (verdict share image)
   */
  async function generateJudgmentPoster(caseData, userVote) {
    const canvas = document.getElementById('shareCanvas');
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);

    // Red accent stripe at top
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(0, 0, W, 6);

    // Brand
    ctx.font = '900 52px Inter, sans-serif';
    ctx.fillStyle = '#dc2626';
    ctx.fillText('VILE', 60, 100);
    ctx.fillStyle = '#ca8a04';
    ctx.fillText('SAINT', ctx.measureText('VILE').width + 70, 100);

    // Divider
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 140);
    ctx.lineTo(W - 60, 140);
    ctx.stroke();

    // Match info
    let y = 200;
    ctx.font = '500 32px Inter, sans-serif';
    ctx.fillStyle = '#a3a3a3';
    const matchText = `${caseData.teamA || 'Mexico'} ${caseData.score || '2–0'} ${caseData.teamB || 'South Africa'}`;
    ctx.fillText(matchText, 60, y);
    y += 50;
    ctx.font = '400 24px Inter, sans-serif';
    ctx.fillStyle = '#6b6b6b';
    ctx.fillText(caseData.stage || 'Group Stage', 60, y);

    // Status badge
    y += 60;
    drawStatusBadge(ctx, caseData.status || 'FINAL', 60, y);

    // Person
    y += 80;
    ctx.font = '400 28px Inter, sans-serif';
    ctx.fillStyle = '#a3a3a3';
    ctx.fillText('The trial of', 60, y);
    y += 50;
    ctx.font = '900 48px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(caseData.personName || 'Raúl Jiménez', 60, y);
    y += 60;
    ctx.font = '400 26px Inter, sans-serif';
    ctx.fillStyle = '#6b6b6b';
    ctx.fillText(caseData.personRole || 'Forward · Mexico', 60, y);

    // Question
    y += 100;
    const question = caseData.question || 'Match-winner or home advantage beneficiary?';
    ctx.font = '800 38px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    const questionLines = wrapText(ctx, question, W - 120);
    questionLines.forEach(line => {
      ctx.fillText(line, 60, y);
      y += 48;
    });

    // User vote
    y += 40;
    ctx.font = '400 26px Inter, sans-serif';
    ctx.fillStyle = '#6b6b6b';
    ctx.fillText('Verdict:', 60, y);
    y += 50;

    const voteText = userVote === 'a' ? (caseData.sideA || 'Match-winner') : (caseData.sideB || 'Home advantage');
    const voteColor = userVote === 'a' ? '#dc2626' : '#ca8a04';
    ctx.font = '800 44px Inter, sans-serif';
    ctx.fillStyle = voteColor;
    ctx.fillText(voteText, 60, y);

    // Bottom section with QR
    const qrY = H - QR_SIZE - 100;
    // Divider
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, qrY - 30);
    ctx.lineTo(W - 60, qrY - 30);
    ctx.stroke();

    // Domain
    ctx.font = '700 28px Inter, sans-serif';
    ctx.fillStyle = '#a3a3a3';
    ctx.fillText('vilesaint.com', 60, qrY - 8);

    // Draw QR code
    await drawQRCode(canvas, caseData.qrUrl || CONFIG.siteUrl, W - QR_SIZE - 60, qrY, QR_SIZE);

    return canvas;
  }

  /**
   * Generate comment share image
   */
  async function generateCommentPoster(caseData, comment) {
    const canvas = document.getElementById('commentShareCanvas');
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(0, 0, W, 6);

    // Brand
    ctx.font = '900 44px Inter, sans-serif';
    ctx.fillStyle = '#dc2626';
    ctx.fillText('VILE', 60, 90);
    ctx.fillStyle = '#ca8a04';
    ctx.fillText('SAINT', ctx.measureText('VILE').width + 70, 90);

    let y = 150;

    // Person name
    ctx.font = '400 26px Inter, sans-serif';
    ctx.fillStyle = '#a3a3a3';
    ctx.fillText('Trial of', 60, y);
    y += 46;
    ctx.font = '900 42px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(caseData.personName || 'Raúl Jiménez', 60, y);
    y += 56;

    // Question
    const question = caseData.question || '';
    if (question) {
      ctx.font = '600 30px Inter, sans-serif';
      ctx.fillStyle = '#dc2626';
      const qLines = wrapText(ctx, question, W - 120);
      qLines.forEach(line => {
        ctx.fillText(line, 60, y);
        y += 40;
      });
    }

    y += 40;

    // Fan tag
    ctx.font = '800 28px Inter, sans-serif';
    ctx.fillStyle = '#ca8a04';
    ctx.fillText(comment.fan_tag || 'VS-000000', 60, y);
    ctx.font = '400 22px Inter, sans-serif';
    ctx.fillStyle = '#6b6b6b';
    ctx.fillText('says:', 60 + ctx.measureText(comment.fan_tag || 'VS-000000').width + 16, y);
    y += 50;

    // Comment body (quotation style)
    ctx.fillStyle = '#1c1c1c';
    const bodyText = comment.body || '';
    const bodyLines = wrapText(ctx, bodyText, W - 160);
    const bodyHeight = bodyLines.length * 44 + 60;
    ctx.fillRect(40, y - 10, W - 80, bodyHeight + 20);
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, y - 10, W - 80, bodyHeight + 20);

    ctx.font = '400 34px Inter, sans-serif';
    ctx.fillStyle = '#f5f5f5';
    bodyLines.forEach(line => {
      ctx.fillText(line, 80, y + 40);
      y += 44;
    });
    y += 40;

    // Time
    const timeStr = comment.created_at ? timeAgo(new Date(comment.created_at)) : '';
    ctx.font = '400 22px Inter, sans-serif';
    ctx.fillStyle = '#6b6b6b';
    ctx.fillText(timeStr, 60, y);

    // Bottom QR
    const qrY = H - QR_SIZE - 100;
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, qrY - 30);
    ctx.lineTo(W - 60, qrY - 30);
    ctx.stroke();

    ctx.font = '700 26px Inter, sans-serif';
    ctx.fillStyle = '#a3a3a3';
    ctx.fillText('vilesaint.com', 60, qrY - 8);

    const commentUrl = `${CONFIG.siteUrl}?case=${caseData.slug || CONFIG.defaultCaseSlug}&comment=${comment.id || ''}`;
    await drawQRCode(canvas, commentUrl, W - QR_SIZE - 60, qrY, QR_SIZE);

    return canvas;
  }

  /**
   * Draw QR code on canvas
   */
  function drawQRCode(canvas, url, x, y, size) {
    return new Promise((resolve) => {
      // Use a small temp div for QR code generation
      const temp = document.createElement('div');
      temp.style.position = 'absolute';
      temp.style.left = '-9999px';
      document.body.appendChild(temp);

      try {
        const qr = new QRCode(temp, {
          text: url,
          width: size,
          height: size,
          colorDark: '#f5f5f5',
          colorLight: '#0a0a0a',
          correctLevel: QRCode.CorrectLevel.M,
        });

        // Give QRCode.js time to render
        setTimeout(() => {
          const qrImg = temp.querySelector('img') || temp.querySelector('canvas');
          if (qrImg) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(x - 8, y - 8, size + 16, size + 16);
            ctx.drawImage(qrImg, x, y, size, size);
          }
          document.body.removeChild(temp);
          resolve();
        }, 300);
      } catch (e) {
        document.body.removeChild(temp);
        resolve();
      }
    });
  }

  function drawStatusBadge(ctx, status, x, y) {
    const colors = {
      'FINAL': '#ca8a04',
      'VERIFIED': '#22c55e',
      'LIVE': '#dc2626',
      'DEVELOPING': '#854d0e',
    };
    const color = colors[status] || '#a3a3a3';
    ctx.font = '700 22px Inter, sans-serif';
    ctx.fillStyle = color;
    ctx.fillText(status, x, y + 18);
  }

  function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines.length ? lines : [text];
  }

  function timeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  /**
   * Download canvas as PNG
   */
  function downloadCanvas(canvas, filename) {
    if (!canvas) return false;
    try {
      const link = document.createElement('a');
      link.download = filename || 'vilesaint-share.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Try system share (mobile) or download
   */
  async function shareCanvas(canvas, filename) {
    if (!canvas) return false;

    // Try Web Share API with file
    if (navigator.share && navigator.canShare) {
      try {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], filename || 'vilesaint-share.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'VileSaint Judgment',
          });
          return true;
        }
      } catch (e) {
        // Fall through to download
      }
    }

    return downloadCanvas(canvas, filename);
  }

  return {
    generateJudgmentPoster,
    generateCommentPoster,
    downloadCanvas,
    shareCanvas,
  };
})();
