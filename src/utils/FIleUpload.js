
/*
*
 * pickDocumentFile
 * Opens a native file picker (via a hidden <input type="file">) and resolves with:
 *  { fileName: string, size: number, formData: FormData }
 * or rejects with { error: true, message: string }
 *
 * Usage:
 *  try {
 *    const result = await pickDocumentFile();
 *    // result.fileName, result.size, result.formData
 *  } catch (err) {
 *    // err.message
 *  }
 */

export function pickDocumentFile({ accept = '.pdf,.doc,.docx', fieldName = 'file', maxSizeBytes = 20 * 1024 * 1024 } = {}) {
	return new Promise((resolve, reject) => {
		try {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = accept;
			input.style.display = 'none';

			input.addEventListener('change', () => {
				const file = input.files && input.files[0];
				if (!file) {
					reject({ error: true, message: 'No file selected' });
					document.body.removeChild(input);
					return;
				}

				// Basic validation
				const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
				if (!allowed.includes(file.type)) {
					// allow some browsers that don't set mime-type correctly by checking extension as fallback
					const ext = file.name.split('.').pop().toLowerCase();
					if (!['pdf', 'doc', 'docx'].includes(ext)) {
						reject({ error: true, message: 'Invalid file type. Only .pdf, .doc and .docx are allowed.' });
						document.body.removeChild(input);
						return;
					}
				}

				if (file.size > maxSizeBytes) {
					reject({ error: true, message: `File size exceeds limit of ${Math.round(maxSizeBytes / 1024 / 1024)}MB` });
					document.body.removeChild(input);
					return;
				}

				const formData = new FormData();
				formData.append(fieldName, file, file.name);

				resolve({ fileName: file.name, size: file.size, formData });
				document.body.removeChild(input);
			});

			document.body.appendChild(input);
			input.click();
		} catch (err) {
			reject({ error: true, message: err?.message || 'Unknown error picking file' });
		}
	});
}

export default pickDocumentFile;
