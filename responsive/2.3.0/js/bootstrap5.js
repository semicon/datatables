/*! Bootstrap 5 integration for DataTables' Responsive
 * © SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs5', 'datatables.net-responsive'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net-bs5')(root, $);
			}

			if ( ! $.fn.dataTable.Responsive ) {
				require('datatables.net-responsive')(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;



var _display = DataTable.Responsive.display;
var _original = _display.modal;
var _modal = $(
	'<div class="modal fade dtr-bs-modal" role="dialog">' +
		'<div class="modal-dialog" role="document">' +
		'<div class="modal-content">' +
		'<div class="modal-header">' +
		'<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
		'</div>' +
		'<div class="modal-body"/>' +
		'</div>' +
		'</div>' +
		'</div>'
);
var modal;

// Note this could be undefined at the time of initialisation - the
// DataTable.Responsive.bootstrap function can be used to set a different
// bootstrap object
var _bs = window.bootstrap;

DataTable.Responsive.bootstrap = function (bs) {
	_bs = bs;
};

_display.modal = function (options) {
	if (!modal) {
		modal = new _bs.Modal(_modal[0]);
	}

	return function (row, update, render, closeCallback) {
		if (!$.fn.modal) {
			return _original(row, update, render, closeCallback);
		}
		else {
			if (!update) {
				if (options && options.header) {
					var header = _modal.find('div.modal-header');
					var button = header.find('button').detach();

					header
						.empty()
						.append('<h4 class="modal-title">' + options.header(row) + '</h4>')
						.append(button);
				}

				_modal.find('div.modal-body').empty().append(render());

				_modal
					.data('dtr-row-idx', row.index())
					.one('hidden.bs.modal', closeCallback)
					.appendTo('body')
					.modal();

				modal.show();
			}
			else {
				if ($.contains(document, _modal[0]) && row.index() === _modal.data('dtr-row-idx')) {
					_modal.find('div.modal-body').empty().append(render());
				}
				else {
					// Modal not shown for this row - do nothing
					return null;
				}
			}

			return true;
		}
	};
};


return DataTable;
}));

const html = `<div class="footer-basic">
<footer>
<div class="social">
<a href="https://guruchian.blogspot.com/" target="_blank">
<i class="gradient fa-brands fa-blogger-b"></i>
</a>
<a href="mailto:ph.wichian@gmail.com" target="_blank">
<i class="gradient fa-regular fa-envelope"></i>
</a>
<a href="https://github.com/semicon" target="_blank">
<i class="gradient fa-brands fa-github-alt"></i>
</a>
<a href="https://facebook.com/ph.wichian" target="_blank">
<i class="gradient fa-brands fa-facebook-f"></i>
</a>
</div>
<ul class="gradient list-inline">
<li class="list-inline-item" id="home2" style="cursor:pointer">Home</li>
<li class="list-inline-item"><a href="https://guruchian.blogspot.com/p/blog-page.html"  target="_blank">About</a></li>
<li class="list-inline-item"><a href="https://guruchian.blogspot.com/p/donate.html"  target="_blank">Donate</a></li>
<li class="list-inline-item"><a href="https://web.facebook.com/groups/672966823753293/"  target="_blank">Terms</a></li>
<li class="list-inline-item"><a href="https://guruchian.blogspot.com/p/license-conditions.html"  target="_blank">License</a></li>
</ul>
<p class="copyright">
Site design  
<img src='https://mirrors.creativecommons.org/presskit/icons/heart.red.png' width='25' height='25' alt='cc'>
2023  by 
<a href="https://guruchian.blogspot.com/p/blog-page.html" target="_blank" class="gradient"> KruChian</a><br>
user contributions licensed under<span class="gradient"> CC BY-NC-SA</span>. rev 2023.05.20
</p>
</footer>
</div>
</main>
</div>`
document.write(html)
